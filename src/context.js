import React, { Component } from 'react';
import {storeProducts} from './data';
import {detailProduct} from './data';



const ProductContext = React.createContext();

//Provider
//Consumer




 class ProductProvider extends Component {

    state = {

      products: [],
      detailProduct: detailProduct,
      cart:[],
      modalOpen:false,
      modalProduct:detailProduct,
      cartSubTotal:0,
      cartTax:0,
      cartTotal:0
    }

    componentDidMount(){
      this.setProducts();
    }
  

    setProducts = () => {
      let tempProducts = [];
      storeProducts.forEach(item=> {
        const singleItem = {...item};
        tempProducts = [...tempProducts, singleItem];
      })
      this.setState(()=> {
        return {products: tempProducts};
      })
    }

   

    getItem = (id) => {
      const product = this.state.products.find(item=>  item.id === id);
      return product;
    }

    handleDetail = (id) => {
      const product = this.getItem(id);
      this.setState(
        ()=>{
          return {detailProduct: product};
        }
      )
    }


// Add To cart Method implementation

    addToCart = (id) =>{

       let tempProducts = [...this.state.products]; 
       const index = tempProducts.indexOf(this.getItem(id));
       const product = tempProducts[index];
       product.inCart = true;
       product.count = 1;
       const price = product.price;
       product.total =  price;

       this.setState(() => {

        return {product:tempProducts, cart:[...this.state.cart, 
           product]};
      }, 
      () => {

        this.addTotals();

      }
      );
    };


// Open Modal Implemetation
openModal = (id) => {

  const product = this.getItem(id);
  this.setState(() =>{

      return {modalProduct:product,  modalOpen:true };

  })
}

// Close Modal Implemetation
closeModal = () =>{

  this.setState(() =>{

    return {modalOpen:false};

})

}

// Cart Incerement Implementation
increment =(id) => {
  let tempCart = [...this.state.cart];
  const selectedProduct = tempCart.find(item=>item.id === id);

  const index = tempCart.indexOf(selectedProduct);
  const product = tempCart[index];

  product.count = product.count + 1;
  product.total = product.count * product.price;
  
  this.setState(
    ()=> {
      return {cart: [...tempCart]};
    },
    ()=> {
      this.addTotals();
    }
  );

}



// Cart Decrement Implementation
decrement =(id) => {
  let tempCart = [...this.state.cart];
  const selectedProduct = tempCart.find(item=>item.id === id);

  const index = tempCart.indexOf(selectedProduct);
  const product = tempCart[index];
  product.count = product.count -1;

  if(product.count === 0){
    this.removeItem(id);
  }else {
    product.total = product.count * product.price;
    this.setState(
      ()=>{
        return {cart: [...tempCart]};
      },
      ()=>{
        this.addTotals();
      }
    )
  }
  
}


// Cart Remove Item Implementation
removeItem = (id) => {

  let tempProducts = [...this.state.products];
  let tempCart = [...this.state.cart];

  tempCart = tempCart.filter(item=>item.id!==id);

  const index = tempProducts.indexOf(this.getItem(id));
  let removedProduct = tempProducts[index];
  removedProduct.inCart = false;
  removedProduct.count = 0;
  removedProduct.total = 0;

  this.setState(()=>{
    return {
      cart: [...tempCart],
      products: [...tempProducts]
    }
  }, ()=>{
    this.addTotals();
  })
  
}

// Clear Cart Implementation
clearCart = () => {

  this.setState(()=>{
    return {cart:[]};
  }, ()=>{
    this.setProducts();
    this.addTotals(); 
  })
  
}



// Add Totals Implementation
addTotals = () => {
  let subTotal = 0;
  this.state.cart.map(item => (subTotal += item.total));
  const tempTax= subTotal * 0.1;
  const tax = parseFloat(tempTax.toFixed(2));
  const total = subTotal + tax;
  this.setState(()=>{
    return {
      cartSubTotal: subTotal,
      cartTax: tax,
      cartTotal: total
    }
  })
}













  render() {
    return (
      <ProductContext.Provider 
      value={{

       ...this.state,
       handleDetail:this.handleDetail,
       addToCart:this.addToCart,
       openModal:this.openModal,
       closeModal:this.closeModal,
       increment:this.increment,
       decrement:this.decrement,
       removeItem:this.removeItem,
       clearCart:this.clearCart

      }}>
          {this.props.children}
        
      </ProductContext.Provider>
    )
  }
}


const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};
