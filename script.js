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
function renderMenu(filter="all"){grid.innerHTML=dishes.filter(d=>filter==="all"||d.category===filter).map(d=>\`<article class="food-card"><div class="food-image"><span>\${d.emoji}</span><small class="food-tag">\${d.tag}</small></div><div class="food-info"><div class="food-title"><h3>\${d.name}</h3><strong>\${money(d.price)}</strong></div><p>\${d.desc}</p><button class="add-button" data-add="\${d.id}">＋ Add to my tray</button></div></article>\`).join("");}
renderMenu();
document.querySelector("#filters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderMenu(b.dataset.filter)});
function renderCart(){const entries=Object.entries(cart).filter(([,q])=>q>0);const total=entries.reduce((s,[id,q])=>s+dishes.find(d=>d.id===+id).price*q,0);count.textContent=entries.reduce((s,[,q])=>s+q,0);document.querySelector("#cart-total").textContent=money(total);document.querySelector("#cart-items").innerHTML=entries.length?entries.map(([id,q])=>{const d=dishes.find(x=>x.id===+id);return \`<div class="cart-line"><span class="mini">\${d.emoji}</span><div><strong>\${d.name}</strong><small>\${money(d.price)} each</small></div><div class="qty"><button data-qty="\${id}" data-delta="-1">−</button><span>\${q}</span><button data-qty="\${id}" data-delta="1">+</button></div></div>\`}).join(""):'<p class="empty">Your tray is empty. This is a tragedy. Add snacks.</p>';}
function toast(msg){const t=document.querySelector("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2100)}
grid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(!b)return;const id=+b.dataset.add;cart[id]=(cart[id]||0)+1;renderCart();toast("YUM! Added to your party tray 🎉")});
document.querySelector("#cart-items").addEventListener("click",e=>{const b=e.target.closest("[data-qty]");if(!b)return;const id=b.dataset.qty;cart[id]=(cart[id]||0)+ +b.dataset.delta;if(cart[id]<=0)delete cart[id];renderCart()});
const cartPanel=document.querySelector("#cart"),overlay=document.querySelector("#overlay");function openCart(){cartPanel.classList.add("open");overlay.classList.add("show")}function closeCart(){cartPanel.classList.remove("open");overlay.classList.remove("show")}
document.querySelector("#open-cart").onclick=openCart;document.querySelector("#close-cart").onclick=closeCart;overlay.onclick=closeCart;
document.querySelector("#checkout").onclick=()=>{if(!Object.keys(cart).length){toast("Your tray is empty. Feed it. 🍟");return}Object.keys(cart).forEach(k=>delete cart[k]);renderCart();closeCart();toast("Order sent! Birthday chefs, assemble! 🍳")};
const dateInput=document.querySelector('input[name="date"]');const today=new Date();dateInput.min=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
document.querySelector("#booking-form").addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target);document.querySelector("#booking-message").textContent=\`You're on the list, \${f.get("name")}! Table for \${f.get("guests")} at \${f.get("time")} requested. Let the party begin! 🎈 (Demo only)\`;e.target.reset();dateInput.min=new Date().toISOString().slice(0,10)});
const surprises=["Your next year will be sprinkled with good things. ✨","You deserve the biggest slice. No arguments. 🍰","A surprise is looking for you. Keep being wonderful. 🎁","Today's forecast: 100% chance of cake. 🎂","Your birthday superpower is making people smile. 💖"];
document.querySelector("#surprise").onclick=()=>{const box=document.querySelector("#surprise-message");box.textContent=surprises[Math.floor(Math.random()*surprises.length)];box.animate([{opacity:0,transform:"translateY(10px) scale(.9)"},{opacity:1,transform:"translateY(0) scale(1)"}],{duration:450});confettiBurst(35)};
function confettiBurst(amount=45){const colors=["#f26b8a","#ffd45c","#8c65b5","#6b9b75","#ff9c45"];for(let i=0;i<amount;i++){const bit=document.createElement("span");bit.textContent=["✦","•","♥","✧"][Math.floor(Math.random()*4)];bit.style.cssText=\`position:fixed;z-index:50;left:\${Math.random()*100}vw;top:-20px;color:\${colors[Math.floor(Math.random()*colors.length)]};font-size:\${12+Math.random()*18}px;pointer-events:none;\`;document.body.appendChild(bit);const drift=(Math.random()-.5)*240;const duration=1300+Math.random()*1300;bit.animate([{transform:"translate3d(0,0,0) rotate(0deg)",opacity:1},{transform:\`translate3d(\${drift}px,110vh,0) rotate(720deg)\`,opacity:.2}],{duration,easing:"cubic-bezier(.2,.7,.3,1)"}).onfinish=()=>bit.remove()}}
document.querySelector("#blow-candles").addEventListener("click",()=>{const cake=document.querySelector("#big-cake"),message=document.querySelector("#wish-message"),button=document.querySelector("#blow-candles");if(!cake.classList.contains("blown")){cake.classList.add("blown");message.innerHTML='<div class="wish-pop">✨ YOUR WISH IS ON ITS WAY! ✨<br>May it come true. 💖</div>';button.textContent="🎂 Light the candles again";confettiBurst(65)}else{cake.classList.remove("blown");message.textContent="Candles relit! Make another wish. 🤫";button.textContent="💨 Blow out the candles"}});
renderCart();

/* Small, original sound effects. Audio only starts after the visitor turns it on. */
const soundButton=document.querySelector("#sound-toggle");
let soundEnabled=false;
let audioContext=null;
function audio(){if(!audioContext){const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return null;audioContext=new Audio()}if(audioContext.state==="suspended")audioContext.resume();return audioContext}
function tone(freq=520,duration=.12,wave="sine",volume=.045,slide=0){if(!soundEnabled)return;const ctx=audio();if(!ctx)return;const osc=ctx.createOscillator(),gain=ctx.createGain(),now=ctx.currentTime;osc.type=wave;osc.frequency.setValueAtTime(freq,now);if(slide)osc.frequency.exponentialRampToValueAtTime(Math.max(60,freq+slide),now+duration);gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(volume,now+.012);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);osc.connect(gain);gain.connect(ctx.destination);osc.start(now);osc.stop(now+duration+.02)}
function chime(){tone(660,.13,"sine",.035);setTimeout(()=>tone(880,.2,"sine",.03),95)}
function softPop(){tone(420,.09,"triangle",.025,240)}
function partySound(){tone(523,.18,"sine",.035);setTimeout(()=>tone(659,.18,"sine",.035),100);setTimeout(()=>tone(784,.28,"sine",.04),210)}
soundButton.addEventListener("click",()=>{soundEnabled=!soundEnabled;soundButton.setAttribute("aria-pressed",String(soundEnabled));soundButton.textContent=soundEnabled?"♪ Sound on":"♪ Sound off";if(soundEnabled){audio();chime()}});
document.querySelector("#menu-grid").addEventListener("click",e=>{if(e.target.closest("[data-add]"))softPop()});
document.querySelector("#open-cart").addEventListener("click",()=>{if(soundEnabled)tone(390,.09,"triangle",.025)});
document.querySelector("#checkout").addEventListener("click",()=>{if(soundEnabled&&Object.keys(cart).length)partySound()});
document.querySelector("#blow-candles").addEventListener("click",()=>{if(soundEnabled)partySound()});
document.querySelector("#surprise").addEventListener("click",()=>{if(soundEnabled)chime()});
document.querySelector("#booking-form").addEventListener("submit",()=>{if(soundEnabled)chime()});


// Replace cartoon menu icons with real food photography.
const foodPhotos={
  1:"https://images.unsplash.com/photo-1646186282205-7e419bc0c272?auto=format&fit=crop&w=900&q=85",
  2:"https://images.unsplash.com/photo-1671106681075-5a7233268cbd?auto=format&fit=crop&w=900&q=85",
  3:"https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&w=900&q=85",
  4:"https://images.unsplash.com/photo-1737012199412-ccf6a9270a5b?auto=format&fit=crop&w=900&q=85",
  5:"https://images.unsplash.com/photo-1676566399758-51b0d3927d48?auto=format&fit=crop&w=900&q=85",
  6:"https://images.unsplash.com/photo-1737012199412-ccf6a9270a5b?auto=format&fit=crop&w=900&q=85",
  7:"https://images.unsplash.com/photo-1669121000748-c9f6cd940ef7?auto=format&fit=crop&w=900&q=85",
  8:"https://images.unsplash.com/photo-1769434128978-5bdcb5c7ee2a?auto=format&fit=crop&w=900&q=85",
  9:"https://api.awakening.bar/media/products/t/side-view-456de857-788c-4a1e-86fd-f989f27a99ca.jpg",
  10:"https://api.awakening.bar/media/products/t/side-view-456de857-788c-4a1e-86fd-f989f27a99ca.jpg",
  11:"https://images.unsplash.com/photo-1728691190582-3011e35efe45?auto=format&fit=crop&w=900&q=85",
  12:"https://images.unsplash.com/photo-1669121000748-c9f6cd940ef7?auto=format&fit=crop&w=900&q=85"
};
renderMenu=function(filter="all"){
  grid.innerHTML=dishes.filter(d=>filter==="all"||d.category===filter).map(d=>`<article class="food-card"><div class="food-image"><img src="${foodPhotos[d.id]}" alt="${d.name}" loading="lazy"><small class="food-tag">${d.tag}</small></div><div class="food-info"><div class="food-title"><h3>${d.name}</h3><strong>${money(d.price)}</strong></div><p>${d.desc}</p><button class="add-button" data-add="${d.id}">Add to my tray +</button></div></article>`).join("");
};
renderMenu();

// Try sound on arrival. Browsers may block it until the visitor interacts.
soundEnabled=true;
soundButton.setAttribute("aria-pressed","true");
soundButton.textContent="♪ Sound on";
let soundUnlocked=false;
function unlockSound(){
  if(soundUnlocked)return;
  const ctx=audio();
  if(ctx){
    ctx.resume().then(()=>{
      soundUnlocked=true;
      soundButton.textContent="♪ Sound on";
      partySound();
    }).catch(()=>{soundButton.textContent="♪ Tap for sound"});
  }
}
try{
  const ctx=audio();
  if(ctx && ctx.state==="running"){
    soundUnlocked=true;
    partySound();
  }else{
    soundButton.textContent="♪ Tap for sound";
    document.addEventListener("pointerdown",unlockSound,{once:true});
    document.addEventListener("keydown",unlockSound,{once:true});
  }
}catch(e){
  soundButton.textContent="♪ Tap for sound";
  document.addEventListener("pointerdown",unlockSound,{once:true});
}
let soundToggleClicks=0;
soundButton.addEventListener("click",()=>{
  soundToggleClicks++;
  soundEnabled=soundToggleClicks%2===1;
  soundButton.setAttribute("aria-pressed",String(soundEnabled));
  soundButton.textContent=soundEnabled?"♪ Sound on":"♪ Sound off";
  if(soundEnabled){unlockSound()} 
});

// Reliable birthday interactions: direct button bindings, independent of section delegation.
(function(){
  const modal=document.getElementById("note-modal");
  const cards=document.querySelectorAll(".note-card[data-note]");
  if(modal){
    const title=modal.querySelector("#note-modal-title");
    const message=modal.querySelector("#note-modal-message");
    const label=modal.querySelector("#note-modal-label");
    function close(){
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden","true");
      document.body.classList.remove("note-modal-open");
    }
    cards.forEach(card=>{
      card.type="button";
      card.addEventListener("click",()=>{
        title.textContent=card.querySelector("strong")?.textContent||"A little note";
        message.textContent=card.dataset.note||"A little reminder, made just for you. ♡";
        label.textContent=card.querySelector("span")?.textContent||"A LITTLE NOTE FOR YOU";
        modal.classList.add("open");
        modal.setAttribute("aria-hidden","false");
        document.body.classList.add("note-modal-open");
      });
    });
    modal.querySelectorAll("[data-note-close]").forEach(el=>el.addEventListener("click",close));
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.classList.contains("open"))close()});
  }
  const surprise=document.getElementById("surprise");
  const surpriseMessage=document.getElementById("surprise-message");
  const wishes=[
    "Your next year will be sprinkled with good things. ✨",
    "You deserve the biggest slice. No arguments. 🍰",
    "A surprise is looking for you. Keep being wonderful. 🎁",
    "Today's forecast: 100% chance of cake. 🎂",
    "Your birthday superpower is making people smile. 💖"
  ];
  if(surprise&&surpriseMessage){
    surprise.onclick=()=>{
      surpriseMessage.textContent=wishes[Math.floor(Math.random()*wishes.length)];
      surpriseMessage.classList.add("show");
      if(typeof confettiBurst==="function")confettiBurst(45);
      if(typeof partySound==="function"&&soundEnabled)partySound();
    };
  }
})();
