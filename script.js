const dishes=[
{id:1,name:"The Big Neighbour",category:"mains",price:119,emoji:"🍔",tag:"house favourite",desc:"Smash patty, cheddar, pickles and our secret sauce."},
{id:2,name:"Sunday Best Pizza",category:"pizza",price:145,emoji:"🍕",tag:"made to share",desc:"Mozzarella, basil, tomato and a very good crust."},
{id:3,name:"Creamy Comfort Pasta",category:"mains",price:129,emoji:"🍝",tag:"cosy classic",desc:"Silky parmesan sauce, herbs and a little black pepper."},
{id:4,name:"Crispy Little Tacos",category:"mains",price:105,emoji:"🌮",tag:"a little crunch",desc:"Three crunchy tacos with slaw and zesty dressing."},
{id:5,name:"Golden Fries",category:"sides",price:49,emoji:"🍟",tag:"extra crispy",desc:"Golden, salty and absolutely not for sharing."},
{id:6,name:"Cheesy Garlic Bread",category:"sides",price:55,emoji:"🥖",tag:"crowd pleaser",desc:"Toasted bread, garlic butter and lots of cheese."},
{id:7,name:"Chocolate Daydream",category:"sweet",price:69,emoji:"🍫",tag:"save room",desc:"Warm chocolate brownie with a scoop of vanilla."},
{id:8,name:"Strawberry Cloud",category:"sweet",price:62,emoji:"🍓",tag:"sweet little thing",desc:"Strawberries, cream and a soft vanilla sponge."},
{id:9,name:"Peachy Lemonade",category:"drinks",price:38,emoji:"🍹",tag:"refreshing",desc:"Peach, lemon, mint and plenty of ice."},
{id:10,name:"Iced Coffee",category:"drinks",price:42,emoji:"🧋",tag:"little pick-me-up",desc:"Cold, creamy coffee over ice."},
{id:11,name:"Sushi Sunshine",category:"mains",price:135,emoji:"🍣",tag:"fresh pick",desc:"A colourful selection of little rice rolls."},
{id:12,name:"Sunday Pancakes",category:"sweet",price:75,emoji:"🥞",tag:"brunch mood",desc:"Fluffy stacks with berries and maple syrup."}
];
const cart={};const money=n=>"R"+n;const grid=document.querySelector("#menu-grid");const count=document.querySelector("#cart-count");
function renderMenu(filter="all"){grid.innerHTML=dishes.filter(d=>filter==="all"||d.category===filter).map(d=>`<article class="food-card"><div class="food-image"><span>${d.emoji}</span><small class="food-tag">${d.tag}</small></div><div class="food-info"><div class="food-title"><h3>${d.name}</h3><strong>${money(d.price)}</strong></div><p>${d.desc}</p><button class="add-button" data-add="${d.id}">＋ Add to your order</button></div></article>`).join("");}
renderMenu();
document.querySelector("#filters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderMenu(b.dataset.filter)});
function renderCart(){const entries=Object.entries(cart).filter(([,q])=>q>0);const total=entries.reduce((s,[id,q])=>s+dishes.find(d=>d.id===+id).price*q,0);count.textContent=entries.reduce((s,[,q])=>s+q,0);document.querySelector("#cart-total").textContent=money(total);document.querySelector("#cart-items").innerHTML=entries.length?entries.map(([id,q])=>{const d=dishes.find(x=>x.id===+id);return `<div class="cart-line"><span class="mini">${d.emoji}</span><div><strong>${d.name}</strong><small>${money(d.price)} each</small></div><div class="qty"><button data-qty="${id}" data-delta="-1">−</button><span>${q}</span><button data-qty="${id}" data-delta="1">+</button></div></div>`}).join(""):'<p class="empty">Your basket is taking a little nap. Add something delicious.</p>';}
function toast(msg){const t=document.querySelector("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2100)}
grid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(!b)return;const id=+b.dataset.add;cart[id]=(cart[id]||0)+1;renderCart();toast("Added to your order ♡")});
document.querySelector("#cart-items").addEventListener("click",e=>{const b=e.target.closest("[data-qty]");if(!b)return;const id=b.dataset.qty;cart[id]=(cart[id]||0)+ +b.dataset.delta;if(cart[id]<=0)delete cart[id];renderCart()});
const cartPanel=document.querySelector("#cart"),overlay=document.querySelector("#overlay");function openCart(){cartPanel.classList.add("open");overlay.classList.add("show")}function closeCart(){cartPanel.classList.remove("open");overlay.classList.remove("show")}
document.querySelector("#open-cart").onclick=openCart;document.querySelector("#close-cart").onclick=closeCart;overlay.onclick=closeCart;
document.querySelector("#checkout").onclick=()=>{if(!Object.keys(cart).length){toast("Your basket is empty. Feed it.");return}Object.keys(cart).forEach(k=>delete cart[k]);renderCart();closeCart();toast("Order sent! The kitchen is on it 🍳")};
const dateInput=document.querySelector('input[name="date"]');const today=new Date();dateInput.min=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
document.querySelector("#booking-form").addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target);document.querySelector("#booking-message").textContent=`Lovely, ${f.get("name")}! Your table request for ${f.get("guests")} at ${f.get("time")} is noted. (Demo only ♡)`;e.target.reset();dateInput.min=new Date().toISOString().slice(0,10)});
const surprises=["You deserve the biggest slice of cake. ♡","May your day be full of good food and better people.","A reminder: you make this little world sweeter.","Today’s special: one giant serving of happiness."];
document.querySelector("#surprise").onclick=()=>{const box=document.querySelector("#surprise-message");box.textContent=surprises[Math.floor(Math.random()*surprises.length)];box.animate([{opacity:0,transform:"translateY(8px)"},{opacity:1,transform:"translateY(0)"}],{duration:450})};
renderCart();