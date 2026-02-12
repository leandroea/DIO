/**
 * Script de teste para validar a API Serverless
 * Este script pode ser usado para testes locais com serverless-offline
 */

const axios = require('axios');

// Configuração da URL base (ajuste conforme necessário)
const BASE_URL = 'http://localhost:3000/dev';

/**
 * Função para testar a criação de usuário
 */
async function testCreateUser() {
  console.log('🧪 Testando criação de usuário...');
  
  try {
    const response = await axios.post(`${BASE_URL}/users`, {
      name: 'Test User',
      email: 'test@example.com',
      age: 25
    });
    
    console.log('✅ Usuário criado com sucesso!');
    console.log('ID:', response.data.user.id);
    return response.data.user.id;
  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error.response?.data || error.message);
    return null;
  }
}

/**
 * Função para testar a listagem de usuários
 */
async function testListUsers() {
  console.log('\n📋 Testando listagem de usuários...');
  
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    console.log(`✅ Lista de usuários obtida! Total: ${response.data.count}`);
    console.log('Usuários:', response.data.users);
    return response.data.users;
  } catch (error) {
    console.error('❌ Erro ao listar usuários:', error.response?.data || error.message);
    return [];
  }
}

/**
 * Função para testar a obtenção de usuário por ID
 */
async function testGetUser(userId) {
  console.log('\n🔍 Testando obtenção de usuário por ID...');
  
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`);
    console.log('✅ Usuário encontrado!');
    console.log('Dados:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao obter usuário:', error.response?.data || error.message);
    return null;
  }
}

/**
 * Função para testar a atualização de usuário
 */
async function testUpdateUser(userId) {
  console.log('\n📝 Testando atualização de usuário...');
  
  try {
    const response = await axios.put(`${BASE_URL}/users/${userId}`, {
      name: 'Updated Test User',
      email: 'updated@example.com',
      age: 26
    });
    
    console.log('✅ Usuário atualizado com sucesso!');
    console.log('Dados atualizados:', response.data.user);
    return response.data.user;
  } catch (error) {
    console.error('❌ Erro ao atualizar usuário:', error.response?.data || error.message);
    return null;
  }
}

/**
 * Função para testar a exclusão de usuário
 */
async function testDeleteUser(userId) {
  console.log('\n🗑️ Testando exclusão de usuário...');
  
  try {
    const response = await axios.delete(`${BASE_URL}/users/${userId}`);
    console.log('✅ Usuário excluído com sucesso!');
    console.log('Resposta:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Erro ao excluir usuário:', error.response?.data || error.message);
    return false;
  }
}

/**
 * Função principal de teste
 */
async function runTests() {
  console.log('🚀 Iniciando testes da API Serverless...\n');
  
  // Testar criação de usuário
  const userId = await testCreateUser();
  if (!userId) {
    console.log('❌ Falha nos testes: Não foi possível criar usuário');
    return;
  }
  
  // Testar listagem
  await testListUsers();
  
  // Testar obtenção por ID
  await testGetUser(userId);
  
  // Testar atualização
  await testUpdateUser(userId);
  
  // Testar exclusão
  await testDeleteUser(userId);
  
  // Testar listagem novamente para confirmar exclusão
  await testListUsers();
  
  console.log('\n🎉 Testes concluídos!');
}

// Executar testes se este script for chamado diretamente
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testCreateUser,
  testListUsers,
  testGetUser,
  testUpdateUser,
  testDeleteUser,
  runTests
};