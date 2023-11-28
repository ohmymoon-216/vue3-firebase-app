import { GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, sendEmailVerification, updateEmail } from 'firebase/auth';
import { auth } from 'src/boot/firebase';

const DEFAULT_PHOTO_URL = 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=';

// 로그인 (구글)
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  return user;
}

export async  function  logout() {
  await signOut(auth);
}

export async function sighUpWithEmail({email, password, nickname}) {
  const {user} = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, {
    displayName: nickname,
    photoURL: generateDefaultPhotoURL(user.uid),
  });
  sendVerificationEmail();
}

export function generateDefaultPhotoURL(uid) {
  return `${DEFAULT_PHOTO_URL}${uid}`;
}

export async  function  signInWithEmail({email, password}) {
  const {user} = await signInWithEmailAndPassword(auth, email, password);
  console.log('login user: ', user);
  return user;
}

export async function sendPasswordReset(email) {
  await sendPasswordReset(auth, email);
}

export async function updateUserPassword(newPassword) {
  await updateUserPassword(newPassword);
}

export async function sendVerificationEmail() {
  await sendEmailVerification(auth.currentUser);
}

export async function  updateUserProfile(displayName) {
  await updateProfile(auth.currentUser, {
    displayName
  });
}

export async function  updateUserEmail(email) {
  await updateEmail(auth.currentUser, email);
}
