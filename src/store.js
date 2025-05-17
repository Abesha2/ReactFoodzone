import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const savedCart=localStorage.getItem('cart');
const localStorageCart=savedCart?JSON.parse(savedCart):[];


    const productSlice = createSlice({
        name: 'products',
        initialState: {
           veg: [
                { name: 'Paneer Butter Masala ', price: 250, images: '/images/panner.jpeg', description: 'Creamy tomato-based gravy with paneer.' },
                 { name: 'Veg Biryani', price: 300, images: '/images/vegBiryani.jpg', description: 'Aromatic rice dish with mixed vegetables.' },
                 { name: 'Aloo Gobi', price: 200, images: '/images/aloo Gobi.jpg', description: 'Cauliflower and potatoes cooked with spices.' },
                { name: 'Chole Bhature', price: 180, images: '/images/chole bhature.jpeg', description: 'Spicy chickpea curry served with fried bread.' },
                { name: 'Palak Paneer', price: 280, images: '/images/palak panner.jpg', description: 'Paneer in a creamy spinach gravy.' },
                { name: 'Dal Makhani', price: 260, images: '/images/dal makhani.jpg', description: 'Black lentil and kidney bean curry.' },
                { name: 'Mixed Veg Curry', price: 240, images: '/images/mixed veg.jpeg', description: 'Assortment of vegetables in a flavorful curry.' },
                { name: 'Kadai Paneer', price: 300, images: '/images/kadai panner.jpeg', description: 'Paneer cooked with bell peppers and onions.' },
                { name: 'Malai Kofta', price: 290, images: '/images/malai kofta.jpeg', description: 'Deep-fried paneer and potato balls in a creamy sauce.' },
                { name: 'Masala Dosa', price: 150, images: '/images/Masala-Dosa.jpg', description: 'Thin rice crepe stuffed with spiced potatoes.' },
 
 ],
 nonveg: [
 { name: 'Chicken Biryani', price: 350, images: '/images/chicken-biryani.jpg', description: 'Aromatic rice dish with chicken.' },
 { name: 'Butter Chicken', price: 380, images: '/images/butter-chicken.jpeg', description: 'Tender chicken in a rich tomato-based gravy.' },
 { name: 'Mutton Curry', price: 400, images: '/images/mutton-curry.jpeg', description: 'Spicy and flavorful mutton curry.' },
 { name: 'Chicken Tikka', price: 320, images: '/images/chicken-tikka.jpg', description: 'Marinated and grilled chicken pieces.' },
 { name: 'Egg Curry', price: 220, images: '/images/egg-curry.jpeg', description: 'Boiled eggs in a spicy gravy.' },
 { name: 'Fish Fry', price: 310, images: '/images/fish.jpg', description: 'Crispy and flavorful fried fish.' },
{ name: 'Prawn Masala', price: 360, images: '/images/prawn-masala.jpeg', description: 'Prawns cooked in a spicy masala.' },
 { name: 'Mutton Korma', price: 420, images: '/images/mutton-korma.jpeg', description: 'Rich and creamy mutton dish.' },
 { name: 'Chicken Lollipop', price: 280, images: '/images/chicken-lollipop.jpeg', description: 'Deep-fried chicken winglets.' },
 { name: 'Tandoori Chicken', price: 340, images: '/images/tandoori-chicken.jpg', description: 'Chicken marinated in yogurt and spices, cooked in a tandoor.' },
 ],
chinese: [
           { name: 'Chow Mein', price: 280, images: '/images/chow-mein.jpg', description: 'Stir-fried noodles with vegetables or meat.' },
            { name: 'Spring Rolls', price: 200, images: '/images/spring-rolls.jpg', description: 'Fried rolls filled with vegetables.' },
            { name: 'Sweet and Sour Chicken', price: 330, images: '/images/sweet-sour.jpg', description: 'Chicken in a tangy sweet and sour sauce.' },
           { name: 'Manchurian', price: 300, images: '/images/manchurian.jpg', description: 'Vegetable or chicken balls in a spicy sauce.' },
           { name: 'Szechuan Noodles', price: 380, images: '/images/schezwan.jpg', description: 'Spicy noodles with Szechuan sauce.' },
          { name: 'Honey Chilli Potatoes', price: 260, images: '/images/honey-chills.jpg', description: 'Crispy fried potatoes in a honey chilli sauce.' },
          { name: 'Dim Sum', price: 350, images: '/images/dim-sum.jpg', description: 'Steamed dumplings with various fillings.' },
          { name: 'Hot and Sour Soup', price: 200, images: '/images/hot-sour.jpg', description: 'Spicy and tangy soup.' },
           { name: 'Kung Pao Chicken', price: 370, images: '/images/kung-pao.jpg', description: 'Spicy stir-fried chicken with peanuts.' },
          { name: 'Beef Chilli', price: 390, images: '/images/beef-chilli.jpeg', description: 'Spicy stir-fried beef with chillies.' },
          { name: 'Dragon Roll', price: 450, images: '/images/dragon-roll.jpg', description: 'Sushi roll with eel and avocado.' },
           { name: 'Crispy Tofu', price: 240, images: '/images/crispy-tofu.jpg', description: 'Crispy fried tofu with a savory sauce.' },
         { name: 'Chicken Fried Wontons', price: 290, images: '/images/chicke-wonton.jpg', description: 'Deep-fried wontons filled with chicken.' },
          ],

    deserts: [
    { name: 'Chocolate Brownie', price: 150, images: '/images/brownies.jpg', description: 'Rich and gooey chocolate brownie topped with chocolate sauce.' },
    { name: 'Gulab Jamun', price: 100, images: '/images/gulab-jamun.jpg', description: 'Sweet and spongy milk dumplings soaked in sugar syrup.' },
    { name: 'Rasgulla', price: 120, images: '/images/rasgulla.jpg', description: 'Soft and spongy cottage cheese balls soaked in sweet syrup.' },

    { name: 'Cheesecake', price: 250, images: '/images/cheese-cake.jpg', description: 'Smooth and creamy cheesecake with a biscuit base.' },
    { name: 'Ras Malai', price: 140, images: '/images/ras-malai.jpg', description: 'Cottage cheese patties in sweet, thickened milk.' },
    { name: 'Fruit Custard', price: 130, images: '/images/fruit-custard.jpg', description: 'A creamy custard dessert loaded with fresh fruits.' },
    { name: 'Mango Pudding', price: 160, images: '/images/mango-pudding.jpg', description: 'Creamy mango-flavored pudding topped with fresh mango slices.' },
    { name: 'Shahi Tukda', price: 150, images: '/images/shahi-tukda.jpg', description: 'Fried bread slices soaked in sweetened milk and garnished with nuts.' },
    { name: 'Tiramisu', price: 220, images: '/images/tiramisu.jpg', description: 'Classic Italian coffee-flavored dessert.' },
    { name: 'Apple Pie', price: 200, images: '/images/apple-pie.jpg', description: 'Warm spiced apple filling wrapped in a flaky crust.' },
    { name: 'Cream Caramel', price: 170, images: '/images/cream-caramel.jpg', description: 'Silky caramel custard dessert.' },
    { name: 'Chocolate Mousse', price: 180, images: '/images/chocolate-mousse.jpg', description: 'Light and fluffy chocolate dessert.' },
    { name: 'Banoffee Pie', price: 190, images: '/images/banoffee-pie.jpg', description: 'Banana and toffee dessert with whipped cream.' },
    { name: 'Pineapple Pastry', price: 120, images: '/images/pineapple-pastry.jpg', description: 'Soft sponge cake with a pineapple flavor.' },
    { name: 'Black Forest Cake', price: 300, images: '/images/black-forest.jpg', description: 'Layered chocolate cake with whipped cream and cherries.' },
    { name: 'Red Velvet Cake', price: 320, images: '/images/red-velvet.jpg', description: 'Moist red cake with cream cheese frosting.' },
    { name: 'Brownie Sundae', price: 210, images: '/images/brownie-sundae.jpg', description: 'Warm brownie served with vanilla ice cream.' },
    { name: 'Carrot Halwa', price: 150, images: '/images/carrot-halwa.jpg', description: 'Sweet Indian dessert made with grated carrots and milk.' },
    { name: 'Coconut Ladoo', price: 90, images: '/images/coconut-ladoo.jpg', description: 'Sweet coconut balls made with condensed milk.' }
],
snacks: [
    { name: 'Samosa', price: 40, images: '/images/samosa.jpg', description: 'Crispy fried pastry filled with spiced potatoes and peas.' },
    { name: 'Paneer Pakora', price: 120, images: '/images/paneer-pakora.jpg', description: 'Crispy gram flour-coated paneer fritters.' },
    { name: 'Chilli Paneer', price: 160, images: '/images/chilli-paneer.jpg', description: 'Spicy stir-fried paneer with peppers.' },
    { name: 'Aloo Tikki', price: 60, images: '/images/aloo-tikki.jpg', description: 'Crispy potato patties served with chutney.' },
    { name: 'Onion Rings', price: 80, images: '/images/onion-rings.jpg', description: 'Crispy and golden-fried onion rings.' },
    { name: 'Chicken Nuggets', price: 150, images: '/images/chicken-nuggets.jpg', description: 'Crunchy chicken bites served with dip.' },

    { name: 'Veg Spring Rolls', price: 100, images: '/images/veg-spring-rolls.jpg', description: 'Crispy rolls filled with spiced vegetables.' },
    { name: 'French Fries', price: 70, images: '/images/french-fries.jpg', description: 'Crispy golden fries served with ketchup.' },
    { name: 'Masala Papad', price: 40, images: '/images/masala-papad.jpg', description: 'Crispy papad topped with tangy onion and tomato mix.' },
    { name: 'Cheese Balls', price: 130, images: '/images/cheese-balls.jpg', description: 'Crispy and cheesy fried balls.' },
    { name: 'Corn Chaat', price: 80, images: '/images/corn-chaat.jpg', description: 'Spicy and tangy corn snack.' },
    { name: 'Chicken Wings', price: 180, images: '/images/chicken-wings.jpg', description: 'Spicy and crispy chicken wings.' },
    { name: 'Veg Puff', price: 50, images: '/images/veg-puff.jpg', description: 'Flaky pastry filled with spiced vegetables.' },
    { name: 'Bread Pakora', price: 50, images: '/images/bread-pakora.jpg', description: 'Gram flour-coated bread stuffed with spiced potatoes.' },
    { name: 'Chana Chaat', price: 70, images: '/images/chana-chaat.jpg', description: 'Spicy and tangy chickpea snack.' },
    { name: 'Moong Dal Kachori', price: 60, images: '/images/kachori.jpg', description: 'Spicy lentil-filled deep-fried snack.' },
    { name: 'Potato Wedges', price: 90, images: '/images/potato-wedges.jpg', description: 'Seasoned and crispy potato wedges.' },
    { name: 'Paneer Tikka', price: 180, images: '/images/paneer-tikka.jpg', description: 'Grilled and spiced paneer cubes.' },
    { name: 'Veg Sandwich', price: 80, images: '/images/veg-sandwich.jpg', description: 'Grilled sandwich filled with fresh veggies.' }
],

pizza: [
  { name: 'Margherita Pizza', price: 180, images: '/images/margherita.jpg', description: 'Classic pizza topped with fresh tomatoes, mozzarella, and basil.' },
  { name: 'Pepperoni Pizza', price: 250, images: '/images/pepperoni.jpg', description: 'Spicy pepperoni on a bed of mozzarella cheese.' },
  { name: 'Veggie Supreme', price: 220, images: '/images/veggie-supreme.jpg', description: 'Loaded with onions, capsicum, olives, and mushrooms.' },
  { name: 'BBQ Chicken Pizza', price: 280, images: '/images/bbq-chicken.jpg', description: 'Grilled chicken with smoky BBQ sauce and onions.' },
  { name: 'Four Cheese Pizza', price: 300, images: '/images/four-cheese.jpg', description: 'A blend of mozzarella, cheddar, gouda, and parmesan.' },
  { name: 'Paneer Tikka Pizza', price: 250, images: '/images/paneer-tikka.jpg', description: 'Tandoori paneer cubes with capsicum and onions.' },
  { name: 'Hawaiian Pizza', price: 270, images: '/images/hawaiian.jpg', description: 'A tropical delight with pineapple and ham.' },
  { name: 'Meat Lovers Pizza', price: 320, images: '/images/meat-lovers.jpg', description: 'Loaded with pepperoni, sausage, ham, and bacon.' },
  { name: 'Garlic Chicken Pizza', price: 260, images: '/images/garlic-chicken.jpg', description: 'Garlic-flavored chicken with mozzarella and onions.' },
  { name: 'Spicy Jalapeno Pizza', price: 230, images: '/images/spicy-jalapeno.jpg', description: 'Cheese, jalapenos, and a spicy tomato base.' },
  { name: 'Mushroom Truffle Pizza', price: 350, images: '/images/mushroom-truffle.jpg', description: 'Rich truffle oil with mushrooms and mozzarella.' },
  { name: 'Mexican Green Wave', price: 240, images: '/images/mexican-green.jpg', description: 'Capsicum, onions, tomatoes, and Mexican herbs.' },
  { name: 'Chicken Sausage Pizza', price: 280, images: '/images/chicken-sausage.jpg', description: 'Loaded with chicken sausages and mozzarella.' },
  { name: 'Cheesy Blast Pizza', price: 310, images: '/images/cheesy-blast.jpg', description: 'Extra cheesy delight with four types of cheese.' },
  { name: 'Pesto Chicken Pizza', price: 300, images: '/images/pesto-chicken.jpg', description: 'Grilled chicken with a fresh basil pesto base.' },
  { name: 'Classic Farmhouse', price: 220, images: '/images/farmhouse.jpg', description: 'Loaded with onions, tomatoes, capsicum, and mushrooms.' },
  { name: 'Peri Peri Chicken Pizza', price: 300, images: '/images/peri-peri.jpg', description: 'Spicy Peri-Peri chicken with capsicum.' },
  { name: 'White Sauce Pizza', price: 270, images: '/images/white-sauce.jpg', description: 'Creamy white sauce with mushrooms and herbs.' }
],
 italian: [
  { name: 'Lasagna', price: 320, images: '/images/lasagna.jpg', description: 'Layers of pasta with meat sauce and creamy béchamel.' },
  { name: 'Spaghetti Carbonara', price: 280, images: '/images/carbonara.jpg', description: 'Spaghetti with eggs, cheese, pancetta, and black pepper.' },
  { name: 'Fettuccine Alfredo', price: 300, images: '/images/alfredo.jpg', description: 'Fettuccine pasta in a creamy Alfredo sauce.' },
  { name: 'Bruschetta', price: 150, images: '/images/bruschetta.jpg', description: 'Toasted bread topped with tomatoes, garlic, and basil.' },


  { name: 'Gnocchi', price: 270, images: '/images/gnocchi.jpg', description: 'Soft potato dumplings served with tomato or cheese sauce.' },
  { name: 'Minestrone Soup', price: 200, images: '/images/minestrone.jpg', description: 'Hearty vegetable soup with pasta or rice.' },
  { name: 'Caprese Salad', price: 180, images: '/images/caprese.jpg', description: 'Fresh tomatoes, mozzarella, and basil drizzled with olive oil.' },
  { name: 'Eggplant Parmigiana', price: 260, images: '/images/eggplant-parm.jpg', description: 'Baked eggplant slices topped with tomato sauce and cheese.' },
  { name: 'Calzone', price: 320, images: '/images/calzone.jpg', description: 'Stuffed pizza with various fillings, folded into a half-moon.' },
  { name: 'Ravioli', price: 280, images: '/images/ravioli.jpg', description: 'Pasta pillows filled with ricotta or meat, served with sauce.' },
  { name: 'Osso Buco', price: 400, images: '/images/osso-buco.jpg', description: 'Slow-cooked veal shanks with a rich tomato-based sauce.' },
  { name: 'Arancini', price: 200, images: '/images/arancini.jpg', description: 'Crispy, deep-fried rice balls filled with cheese or meat.' },
  { name: 'Cannoli', price: 160, images: '/images/cannoli.jpg', description: 'Crispy pastry shells filled with sweet ricotta cream.' },
  { name: 'Panna Cotta', price: 150, images: '/images/panna-cotta.jpg', description: 'Silky smooth cream dessert served with fruit sauce.' },
  { name: 'Pesto Pasta', price: 250, images: '/images/pesto-pasta.jpg', description: 'Pasta tossed in fresh basil pesto sauce.' },
  { name: 'Polenta', price: 220, images: '/images/polenta.jpg', description: 'Creamy cornmeal served with meat or cheese.' },
  { name: 'Focaccia', price: 180, images: '/images/focaccia.jpg', description: 'Flatbread topped with olive oil, herbs, and sea salt.' },
  { name: 'Tortellini', price: 290, images: '/images/tortellini.jpg', description: 'Stuffed pasta with cheese or meat filling, served in broth or sauce.' }
],

    },

    reducers: {},
   
});


const cartSlice=createSlice({ 
    name:'cart',
    initialState:localStorageCart,
    reducers:{
        AddToCart:(state,inputItem)=>
        {
            const item=state.find(item=>item.name===inputItem.payload.name);
            if(item)
            {
                item.quantity+=1;
            }
            else
            {
                state.push({...inputItem.payload,quantity:1});
            }
        },
    


    IncrCart:(state,inputItem)=>
        {
            const item=state.find(item=>item.name===inputItem.payload.name);
            if(item)
            {
                item.quantity+=1;
            }
        },
        DecrCart: (state, action) => {
            const item = state.find(i => i.name === action.payload.name);
            if (item && item.quantity > 1) {
              item.quantity -= 1;
            } else {
              // If quantity is 1, remove item
              return state.filter(i => i.name !== action.payload.name);
            }
          },
      
          RemoveFromCart: (state, action) => {
            return state.filter(i => i.name !== action.payload.name);
          },
          
         ClearCart:()=>[]
}})



// Order Slice
const orderSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    OrderDetails: (state, action) => {
      state.push(action.payload);
    }
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isAuthenticated: false,
    currentUser: null,
  },
  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload);
    },
    loginUser: (state, inputData) => {
      
      const foundUser = state.users.find(
        user => user.username ===inputData.payload. username && user.password ===inputData.payload. password
      );
      if (foundUser) {
        state.currentUser = foundUser;
        state.isAuthenticated = true;
      }
      else{
        alert("Invalid Credentials");
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
      },
});



export let {AddToCart,IncrCart,DecrCart,RemoveFromCart,ClearCart}=cartSlice.actions;
export const { OrderDetails } = orderSlice.actions;
export const{registerUser,loginUser,logoutUser}=userSlice.actions;


//configure the store
const store=configureStore({
    reducer:{
        products:productSlice.reducer,
        cart:cartSlice.reducer,
        orders: orderSlice.reducer, 
        users:userSlice.reducer
        
    }
});
store.subscribe(()=>{
const state=store.getState();
localStorage.setItem('cart',JSON.stringify(state.cart))
});



export default store;