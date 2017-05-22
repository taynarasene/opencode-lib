var cart = {

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

        )},

    getProducts: async function (callback) {
        dataSession = await cart.getSession();
        getProducts = await fetch(`/web_api/cart/${dataSession}`);
        products = await getProducts.json();
        response = (products.code == '404') ? 'Carrinho Vazio' : products ;
        if(typeof callback == "function")
            callback(response);
    },

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

    getSession: function (){
        dataSession =  $("html").attr("data-session");
        dataSession = (dataSession === undefined || dataSession === null || dataSession === '')? dataLayer[0].visitorId : dataSession;
        return dataSession;
    }
};
