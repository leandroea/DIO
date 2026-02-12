const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const USERS_TABLE = process.env.USERS_TABLE;

// Helper function to generate response
const generateResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
    },
    body: JSON.stringify(body)
  };
};

// Helper function to validate user data
const validateUser = (user) => {
  const errors = [];
  
  if (!user.name || user.name.trim() === '') {
    errors.push('Name is required');
  }
  
  if (!user.email || user.email.trim() === '') {
    errors.push('Email is required');
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    errors.push('Email format is invalid');
  }
  
  if (user.age && (isNaN(user.age) || user.age < 0)) {
    errors.push('Age must be a positive number');
  }
  
  return errors;
};

// Create User Function
module.exports.createUser = async (event) => {
  try {
    const data = JSON.parse(event.body);
    
    // Validate input
    const validationErrors = validateUser(data);
    if (validationErrors.length > 0) {
      return generateResponse(400, {
        error: 'Validation failed',
        details: validationErrors
      });
    }
    
    // Generate ID
    const id = require('crypto').randomUUID();
    const createdAt = new Date().toISOString();
    
    const user = {
      id,
      name: data.name.trim(),
      email: data.email.trim(),
      age: data.age,
      createdAt,
      updatedAt: createdAt
    };
    
    // Save to DynamoDB
    await dynamodb.put({
      TableName: USERS_TABLE,
      Item: user
    }).promise();
    
    return generateResponse(201, {
      message: 'User created successfully',
      user: user
    });
    
  } catch (error) {
    console.error('Error creating user:', error);
    return generateResponse(500, {
      error: 'Could not create user',
      details: error.message
    });
  }
};

// Get User Function
module.exports.getUser = async (event) => {
  try {
    const id = event.pathParameters.id;
    
    if (!id) {
      return generateResponse(400, {
        error: 'User ID is required'
      });
    }
    
    const result = await dynamodb.get({
      TableName: USERS_TABLE,
      Key: { id }
    }).promise();
    
    if (!result.Item) {
      return generateResponse(404, {
        error: 'User not found'
      });
    }
    
    return generateResponse(200, result.Item);
    
  } catch (error) {
    console.error('Error getting user:', error);
    return generateResponse(500, {
      error: 'Could not retrieve user',
      details: error.message
    });
  }
};

// Update User Function
module.exports.updateUser = async (event) => {
  try {
    const id = event.pathParameters.id;
    const data = JSON.parse(event.body);
    
    if (!id) {
      return generateResponse(400, {
        error: 'User ID is required'
      });
    }
    
    // Validate input
    const validationErrors = validateUser(data);
    if (validationErrors.length > 0) {
      return generateResponse(400, {
        error: 'Validation failed',
        details: validationErrors
      });
    }
    
    const updatedAt = new Date().toISOString();
    
    const params = {
      TableName: USERS_TABLE,
      Key: { id },
      UpdateExpression: 'SET name = :name, email = :email, age = :age, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':name': data.name.trim(),
        ':email': data.email.trim(),
        ':age': data.age,
        ':updatedAt': updatedAt
      },
      ReturnValues: 'ALL_NEW'
    };
    
    const result = await dynamodb.update(params).promise();
    
    return generateResponse(200, {
      message: 'User updated successfully',
      user: result.Attributes
    });
    
  } catch (error) {
    console.error('Error updating user:', error);
    return generateResponse(500, {
      error: 'Could not update user',
      details: error.message
    });
  }
};

// Delete User Function
module.exports.deleteUser = async (event) => {
  try {
    const id = event.pathParameters.id;
    
    if (!id) {
      return generateResponse(400, {
        error: 'User ID is required'
      });
    }
    
    await dynamodb.delete({
      TableName: USERS_TABLE,
      Key: { id }
    }).promise();
    
    return generateResponse(200, {
      message: 'User deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting user:', error);
    return generateResponse(500, {
      error: 'Could not delete user',
      details: error.message
    });
  }
};

// List Users Function
module.exports.listUsers = async (event) => {
  try {
    const params = {
      TableName: USERS_TABLE
    };
    
    const result = await dynamodb.scan(params).promise();
    
    return generateResponse(200, {
      users: result.Items,
      count: result.Count
    });
    
  } catch (error) {
    console.error('Error listing users:', error);
    return generateResponse(500, {
      error: 'Could not retrieve users',
      details: error.message
    });
  }
};