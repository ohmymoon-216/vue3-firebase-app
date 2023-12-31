import {db} from 'boot/firebase';
import { doc, updateDoc,deleteDoc, query, where, getDocs, addDoc, collection, serverTimestamp, orderBy, getDoc } from 'firebase/firestore';

export async function createPost(data) {

  const docRef = await addDoc(collection(db, 'posts'), {
    ...data,
    readCount: 0,
    likeCount: 0,
    commentCount: 0,
    bookmarkCount: 0,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getPosts(params) {

  const conditions = [];
  if(params?.category) {
    conditions.push(where('category', '==', params?.category));
  }
  if(params?.tags && params?.tags.length > 0) {
    conditions.push(where('tags', 'array-contains-any', params?.tags));
  }
  if(params?.sort) {
    conditions.push(orderBy(params.sort, 'desc'));
  }
  const q = query(collection(db, "posts"), ...conditions);
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map((docs) => {
    const data = docs.data();
    return {
      ...data,
      id: docs.id,
      createdAt: data.createdAt?.toDate(),
    }
  });
  return posts;
}

export async function getPost(id) {
  const docSnap = await getDoc(doc(db, 'posts', id))

  if(!docSnap.exists()){
    throw new Error('No such document!');
  }

  const data = docSnap.data();

  console.log('getPost: ', id, data);

  return {
    ...data,
    createdAt: data.createdAt?.toDate()
  }
}

export async function updatePost(id, data) {
  await updateDoc(doc(db, 'posts', id), {
    ...data,
    updateAt: serverTimestamp(),
  });
}

export async function deletePost(id) {
  await deleteDoc(doc(db, 'posts', id));
}
