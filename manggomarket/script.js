import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase 설정
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
const auth = getAuth();
const db = getFirestore(app);

// reCAPTCHA
function renderRecaptcha() {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible'
    });
}

// 전화번호 인증
window.sendOTP = function() {
    const phoneNumber = document.getElementById("phoneNumber").value;
    renderRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            alert("인증번호가 발송되었습니다.");
        }).catch(console.error);
}

window.verifyOTP = function() {
    const code = document.getElementById("otpCode").value;
    window.confirmationResult.confirm(code)
        .then(() => {
            alert("인증 완료");
        }).catch(console.error);
}

// 상품 등록
window.addProduct = async function() {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const desc = document.getElementById("productDesc").value;

    await addDoc(collection(db, "products"), {
        name, price, desc,
        status: "판매중",
        createdAt: Date.now()
    });

    alert("상품이 등록되었습니다.");
}

// 실시간 상품 목록
const productList = document.getElementById("product-list");
onSnapshot(collection(db, "products"), (snapshot) => {
    productList.innerHTML = "";
    snapshot.forEach((doc) => {
        const data = doc.data();
        productList.innerHTML += `
            <div>
                <h3>${data.name}</h3>
                <p>${data.price} VND</p>
                <p>${data.desc}</p>
                <p>상태: ${data.status}</p>
            </div>
        `;
    });
});
