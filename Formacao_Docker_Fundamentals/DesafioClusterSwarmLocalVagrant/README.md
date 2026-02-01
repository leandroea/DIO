# Projeto: Cluster Docker Swarm com Vagrant

Este projeto cria um **Cluster Docker Swarm** local utilizando **Vagrant** e **VirtualBox**.  
O cluster é composto por 4 máquinas virtuais:
- **master** → nó manager do cluster
- **node01, node02, node03** → nós workers

---

## 🚀 Passo a Passo

### 1. Pré-requisitos
- Instalar [VirtualBox](https://www.virtualbox.org/)
- Instalar [Vagrant](https://www.vagrantup.com/)

### 2. Subir o Cluster
No terminal, dentro da pasta do projeto, execute:
```bash
vagrant up
```
Isso criará e provisionará as 4 máquinas virtuais com Docker pré-instalado.

### 3. Acessar a máquina master
```bash
vagrant ssh master
```

### 4. Inicializar o Swarm

Dentro da máquina master:
```bash
docker swarm init --advertise-addr 192.168.56.10
```
Será exibido um comando docker swarm join ....
Copie esse comando.

### 5. Adicionar os Workers

Acesse cada nó (node01, node02, node03) e execute o comando fornecido pelo swarm init:
### 3. Acessar a máquina master
```bash
vagrant ssh node01
# cole o comando docker swarm join

vagrant ssh node02
# cole o comando docker swarm join

vagrant ssh node03
# cole o comando docker swarm join

```

### 6. Verificar o Cluster

Na máquina master:
```bash
docker node ls
```
Você verá o master como Leader e os demais como Workers.

### 📌 Observações

    Cada máquina possui IP fixo:

        master → 192.168.56.10

        node01 → 192.168.56.11

        node02 → 192.168.56.12

        node03 → 192.168.56.13

    É possível escalar serviços facilmente:
	Na máquina master:
	```bash
	docker service create --name web --replicas 3 -p 8080:80 nginx
	```
	