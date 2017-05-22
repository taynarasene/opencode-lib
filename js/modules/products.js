/**
  * author: Taynara Sene
  * github: taahsene
  *
  * Biblioteca em Javascript da api publica de produtos
  *
  * **Utilização**
  *
  * Utilize a função abaixo passando os parametros que deseja.
  *
  * **get Produtcs**
  * @attrs: array or null
  *
  * products.getProducts(attrs ,function (response) {
  *  console.log(response);
  * })
  *  **get Product ID**
  * products.getProducts(product_id, attrs, function(response) {
  *     console.log(response);
  * });
  *
  */

var products = {
    getProducts: async function (attrs, callback) {
      dataSession = await products.getSession();
      url = (attrs)? `/web_api/products${products.attrFunction(attrs)}`: `/web_api/products` ;
      getProducts = await fetch(url);
      products = await getProducts.json();
      if(typeof callback == "function")
          callback(products);
    },
    getProductsId: async function (product_id, attrs, callback) {
      dataSession = await products.getSession();
      url = (attrs != null)? `/web_api/products/${product_id}${products.attrFunction(attrs)}`: `/web_api/products/${product_id}` ;
      getProducts = await fetch(url);
      products = await getProducts.json();
      if(typeof callback == "function")
          callback(products);
    },
    getSession: async function (){
        hash = await fetch(`/nocache/app.php?loja=${store.id}`);
        dataSession = await hash.json();
        dataSession = (dataSession.hash === undefined || dataSession.hash === null || dataSession.hash === '')? dataLayer[0].visitorId : dataSession.hash;
        return dataSession;
    },
    attrFunction: function (attrs) {
      atributes = `?attrs=`;
      attrs.forEach(function (element, index, array) {
        split = (index)? `&`: ``;
        atributes =  `${atributes}${ split }Product.${ element }`;
      })
      return atributes;
    }
};
