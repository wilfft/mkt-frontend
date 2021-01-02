



# Um aplicativo simples, com as serviços independentes, back end, front end e mobile.  :ok_hand:

> Desenvolvido em React e NodeJs 
>
> Apoiado nas ferramentas, express, axios
>
> Persistência de dados usando banco não relacional, Mongo db, via atlas. 
>

A ideia inicial foi desenvolver um aplicativo tanto web quanto mobile que permita que os usuários se cadastrem e venda seus produtos um para os outros, como um classificado. As regras de negócios serão implementadas assim que mais conhecimento for adquirido.
 


# Front End  :cyclone:
 
### LOGON - página de acesso e logon

- O app exibe uma tela de login inicial, que permite a inserção de CPF e Senha ou a opção de cadastrar através do 'não tenho cadastro.'

- Ao clicar em Entrar,  será acionada a função handlerLogon, que através dos campos cpf e password salvos no useState, vai gerar uma promisse pro database, passando para o backend os argumento  cpf e pass(password) 

- E com a resposta, será armazenado no local storage o respectivo _id do usuário localizado e o seu nome, para ser apresentado em tela na próxima página e demais requisições.

  

#### 

![image](https://user-images.githubusercontent.com/68745408/101971668-ecce8480-3c11-11eb-9c82-8707644c0021.png)
--------------

------------
 
### Register - página de novo usuário  :construction_worker:

- Temos um formulário comum, onde ainda não está totalmente validado mas será implementado em breve.
- O sistema permite a inserção  de dados básicos para o cadastro e os armazena na variável de estado . 
- Será feita uma chamada pra Api, utilizando o axios, (importado de outro módulo) para requisições com o ambiente externo. 
- Essa requisição de modo POST vai chamar a rota de adicionar usuário, passando para o backend todo o conteúdo obtido do form de cadastro.

![image-20201211170324807](https://user-images.githubusercontent.com/68745408/101971740-446cf000-3c12-11eb-8ccd-80302173ec5d.png)
------------------

-----------



### Profile- página após feito o logon, onde exibe todos produtos cadastrados do usuário.  :mag_right:

- A página exibe os produtos que são trazidos do backend assim que o modulo for carregado, graças ao useEffect.
- o useEffect, junto do axios (api) , envia uma requisição externa para o banco, passando como argumento  o ' _id ' que está armazenado no local storage, porém ele transfere essa informação através do 'headers' e recebe como resposta os itens como um array.
- Uma lista é gerada com os dados desse array e alimentando os campos.
- Um botão de delete está disponivel, e ao ser acionado, uma funçao será executada, trazendo como argumento o _id do objeto que foi clicado. 
- Note que ao clicar no delete, não chamamos uma função de imediato, mas sim usamos uma função como parâmetro para que ela possa passar para o backend os dados _id do item, e nome do item.
- A função handleDeleteProduct vai passar pro axios, os argumentos item._id como parametro da end point, e tambem o _id do usuário pelo headers, que armazenamos logo ao fazer o login.
- Note que o useEffect vai reagir toda vez que o userId armazenado no local storage for alterado, ou seja, no proximo login, os dados serão outros.
- Temos um botão Cadastrar novo produto que nos levará para a próxima tela e o botão de logout, que vai limpar nosso cache e deslogando do sistema.

 ![image-20201211164434916](https://user-images.githubusercontent.com/68745408/101971738-42a32c80-3c12-11eb-9900-d53558aaf3f9.png)
---------

-------



### New Product - página acionada após clicar no botão cadastrar novo produto :hammer:

- Um formulário recebe os dados do produto.
- Ao clique do cadastrar, passaremos pro backend os dados do body e também o _id do usuário armazenado no local storage, esse  id será enviado através do headers com o nome de Autorization.  ( errata: faltou um h no authorization, que será corrigido em breve para evitar erros futuros no código)
- A chamada a api (axios) vai chamar a rota patch, pra atualizar o usuário com o novo produto adicionar.

![image-20201211171514709](https://user-images.githubusercontent.com/68745408/101971743-459e1d00-3c12-11eb-8143-d7dec42e26fb.png)
------------

-------------



## Serviço de requisição com o ambiente externo, utilizando o Axios :satellite:

![image-20201211175006888](https://user-images.githubusercontent.com/68745408/101971684-0b348000-3c12-11eb-9314-836bf2e5cb87.png)

---

---



## Rotas para comunicação com o backend  :telephone_receiver:

Foi usado o BrowserRouter para o gerenciamento das urls e o Switch para garantir acesso exclusivo de cada rota

![image-20201211175113251](https://user-images.githubusercontent.com/68745408/101971685-0cfe4380-3c12-11eb-919a-b6ed6911f59a.png)
----

-----------

# BACK END



### CONTROLLERS

###   LOGON -  Página de logon

- É recebido do front end, os argumentos login e pass e chamando uma função assíncrona de pesquisa no banco
- Essa pesquisa vai localizar o usuário cujo cpf e password coincida com os dados informados.
- se suceder, retorna sucesso,
- senão retorna usuário não encontrado
- se a requisição falhar, um erro será exibido

![image-20201211191930617](https://user-images.githubusercontent.com/68745408/101971721-328b4d00-3c12-11eb-86fe-9166dcfb014b.png)

-----

-----------



### NEW USER - persistência de usuários no banco de dados.

- os dados recebido do body do form são usados para gerar um novo userModel
- uma função assincrona irá persistir essse novo usuário no banco.

![image-20201211191909174](https://user-images.githubusercontent.com/68745408/101971720-31f2b680-3c12-11eb-9d77-9f3578e17998.png)
----

-----



### PROFILE- Rota que recebe os itens do usuário localizado no banco.

- O id recebido pelo headers em nome de autorization (authorization*** ) é usado como parâmetro para localizar o usuário no banco
- assim que localizado, iremos passar para o front somente os itens desse usuário localizado.


![image-20201211182812486](https://user-images.githubusercontent.com/68745408/101971695-1a1b3280-3c12-11eb-9c04-35699a371aa7.png)

--------

------------

### ADD PRODUCT - Rota que persiste novos itens no usuário.

A requisição recebe do front, o id pelo headers e os dados do item pelo body.

![image-20201211183743887](https://user-images.githubusercontent.com/68745408/101971699-1daeb980-3c12-11eb-8863-7b65895004ba.png)

----

---

### Delete Product - rota do botão de deletar produto da lista de produtos do usuário,

- Recebe o id do usuário através do headers e o id do produto pelos parâmetros da rota.
- É executado uma query no banco pra remover o item 

 
 ![image-20201211185154262](https://user-images.githubusercontent.com/68745408/101971709-2901e500-3c12-11eb-9529-fb986ce952a6.png)
----

### userSchema = model do usuário, que contem todos seus atributos, usado pelo mongoose  para persistir os dados no banco.


 ![image-20201211191131642](https://user-images.githubusercontent.com/68745408/101971711-2acba880-3c12-11eb-983b-6b780fc3c88b.png)
----

### Routes - auto explicativo, nossas rotas, que são são interligadas com os controladores.
 
 ![image-20201211191758744](https://user-images.githubusercontent.com/68745408/101971716-2f905c80-3c12-11eb-8943-d35d99f9f44c.png)




## CONCLUSÃO

> Esse projeto, apesar de extremamente simples me trouxe extrema satisfação, por estar a menos de 2 semanas focando somente na stack MERN sinto que cada vez mais ganho fluência com o framework. Pretendo ampliar para algum outro banco relacional como o Postgre, mas focado no react/react native
>
> Foram muitos erros encontrados ao longo do caminho que atrasou bastante mas tudo foi aprendizado e todos os erros e acertos são registrado para que não ocorram novamente.

O próximo passo será criar os testes automatizados e as validações, logo depois o deploy para fins de aprendizado.

