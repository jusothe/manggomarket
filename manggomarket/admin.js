import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase 설정 동일
const firebaseConfig = {
  apiKey: "AIzaSyB-2ppxdvtaW50-JghD-6pJYN5vngwA1hM",
  authDomain: "manggomarket-f1fd3.firebaseapp.com",
  projectId: "manggomarket-f1fd3",
  storageBucket: "manggomarket-f1fd3.firebasestorage.app",
  messagingSenderId: "511082163569",
  appId: "1:511082163569:web:a68974a1801c8f81271ad0",
  measurementId: "G-XDS0R40SJB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const adminProductList = document.getElementById("admin-product-list");

onSnapshot(collection(db, "products"), (snapshot) => {
    adminProductList.innerHTML = "";
    snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        adminProductList.innerHTML += `
            <div>
                <h3>${data.name}</h3>
                <p>${data.price} VND</p>
                <p>${data.desc}</p>
                <p>상태: ${data.status}</p>
                <button onclick="changeStatus('${docSnap.id}', '${data.status}')">상태 변경</button>
            </div>
        `;
    });
});

window.changeStatus = async function(id, currentStatus) {
    const nextStatus = currentStatus === "판매중" ? "거래중" :
                      currentStatus === "거래중" ? "판매완료" : "판매중";
    await updateDoc(doc(db, "products", id), { status: nextStatus });
}
