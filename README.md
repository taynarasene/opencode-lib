# opencode-lib
Biblioteca Javascript para as APIs Publicas do Opencode 


## Cart

### Utilização
    
Utilize a função abaixo passando os parametros que deseja.
    
Busca o dataSession atual.

```javascript
   cart.getSession(function (response) {
    console.log(response);
   })
```
Busca os produtos no Carrinho

```javascript
   cart.getProducts( function(response) {
       console.log(response);
   });
```
Adiciona um produto ao Carrinho

```javascript
   var Products ={'product_id' : 25, 'quantity' : 1 };
   cart.addProduct(Products, function(response){
       console.log(response);
   })
``` 
    
Deleta um produto do carrinho

```javascript
   var Delete = {'product_id' : 25 };
   cart.deleteProduct(Delete, function(response){
     console.log(response);
   })
```
### Products

Retorna os produtos na loja (page 1)

```javascript
   products.getProducts(null,function (response) {
    console.log(response);
   })
```
Trás apenas os atributos especificos dos produtos

```javascript
   products.getProducts(['nome','price'],function (response) {
    console.log(response);
   })
```
Retorna um produto especifico

```javascript
   products.getProductsId(product_id, null, function(response) {
       console.log(response);
   });
```
Retorna os campos especificos de um produto especifico

```javascript
   products.getProductsId(product_id, [nome, price], function(response) {
       console.log(response);
   });
```


Para saber mais acesse a Documentação das APIs do opencode clicando [aqui](http://dev.tray.com.br/hc/pt-br/sections/203542997-APIs-REST-P%C3%BAblicas)
