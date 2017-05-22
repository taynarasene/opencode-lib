/**
  * author: Taynara Sene
  * github: taahsene
  *
  * Biblioteca em Javascript da api publica de carrinho
  *
  * **Utilização**
  *
  * Utilize a função abaixo passando os parametros que deseja.
  *
  * **get DataSession**
  * cart.getSession(function (response) {
  *  console.log(response);
  * })
  *  **get Products**
  * cart.getProducts( function(response) {
  *     console.log(response);
  * });
  *
  * ** add Product **
  * var Products ={'product_id' : 25, 'quantity' : 1 };
  * cart.addProduct(Products, function(response){
  *     console.log(response);
  * })
  *
  * **Delete Product**
  * var Delete = {'product_id' : 25 };
  * cart.deleteProduct(Delete, function(response){
  *   console.log(response);
  * })
  */

var cart = {
    // Adiciona produto
    addProduct: async function (product, callback) {
        dataSession = cart.getSession();
        product_id = product.product_id;
        qtd = (product.quantity == undefined||product.quantity == null)? 1 : product.quantity;
        variantId = (product.variant_id == undefined||product.variant_id == null)? 0 : product.variant_id;

        addProduct = await fetch('/web_api/cart/', {
            method: 'POST',
            headers: new Headers({'Content-Type':'application/json'}),
            body: `{"Cart":{"session_id":"${dataSession}","product_id":"${product_id}","quantity":"${qtd}","variant_id":"${variantId}"}}`
        }).then(function(response) {
            response.json().then(
                function(resp){
                    if(typeof callback == "function")
                        callback(resp);
                }
            )}
        )
    },
    // Busca produto
    getProducts: async function (callback) {
        dataSession = await cart.getSession();
        getProducts = await fetch(`/web_api/cart/${dataSession}`);
        products = await getProducts.json();
        response = (products.code == '404') ? 'Carrinho Vazio' : products ;
        if(typeof callback == "function")
            callback(response);
    },
    // Deleta produto
    deleteProduct: async function (product, callback) {
        product_id = product.product_id;
        variantId = (product.variant_id == undefined||product.variant_id == null)? 0 : product.variant_id;
        dataSession = await cart.getSession();

        url = `/web_api/carts/${dataSession}/${ product_id }/${variantId}`;
        deleteProduct = await fetch( url, {
            method: 'delete'
        }).then(function(response){
            response.json().then(
                function(resp){
                    if(typeof callback == "function")
                        callback(resp);
                })
        });
    },
    // Busca Sessão
    getSession: async function (callback){
        hash = await fetch(`/nocache/app.php?loja=${store.id}`);
        dataSession = await hash.json();
        dataSession = (dataSession.hash === undefined || dataSession.hash === null || dataSession.hash === '')? dataLayer[0].visitorId : dataSession.hash;

        if(typeof callback == "function")
            callback(dataSession);

        return dataSession;
    }
};
