const firebaseConfig = {
  apiKey: "AIzaSyBfvYFXAbxBCpLMxOAt3-1FVMoA1NZP4Wk",
  authDomain: "quantum2-93221.firebaseapp.com",
  projectId: "quantum2-93221",
  storageBucket: "quantum2-93221.firebasestorage.app",
  messagingSenderId: "595578976500",
  appId: "1:595578976500:web:fddbf209a8a17f1f1bc6a1"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const TARGET = 1000;
const GROUP = "https://t.me/quantumbrewvcf";
const ADMIN = "t.me/prince101g";

const regEl = document.getElementById("registered");
const remEl = document.getElementById("remaining");
const pctEl = document.getElementById("percent");
const msg = document.getElementById("msg");

db.collection("contacts").onSnapshot(snap => {
  const count = snap.size;
  regEl.textContent = count;
  remEl.textContent = TARGET - count;
  pctEl.textContent = Math.floor((count / TARGET) * 100) + "%";
});

document.getElementById("submitBtn").onclick = async () => {
  if (localStorage.getItem("submitted")) return;

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  if (!name || !phone) return;

  try {
    await db.collection("contacts").doc(phone).set({
      name: "👣 " + name,
      phone,
      time: firebase.firestore.FieldValue.serverTimestamp()
    });

    localStorage.setItem("submitted", "yes");
    msg.textContent = "Contact submitted successfully";

    setTimeout(() => location.href = GROUP, 2000);
  } catch {
    msg.textContent = "Already submitted";
  }
};

document.getElementById("adminBtn").onclick = () => location.href = ADMIN;
document.getElementById("groupBtn").onclick = () => location.href = GROUP;
