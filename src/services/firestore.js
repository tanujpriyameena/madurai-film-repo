import { db } from '../firebase';
import {
  doc, getDoc, setDoc, deleteDoc,
  collection, getDocs, updateDoc, arrayUnion, arrayRemove
} from 'firebase/firestore';

// ── User data (favorites, watched, bio) ──

export async function getUserData(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : {};
}

export async function updateUserData(uid, data) {
  await setDoc(doc(db, 'users', uid), data, { merge: true });
}

// ── Ratings ──

export async function setRating(movieId, uid, value) {
  await setDoc(doc(db, 'movieRatings', String(movieId), 'ratings', uid), { value });
}

export async function getUserRating(movieId, uid) {
  const snap = await getDoc(doc(db, 'movieRatings', String(movieId), 'ratings', uid));
  return snap.exists() ? snap.data().value : 0;
}

export async function getMovieRatings(movieId) {
  const snap = await getDocs(collection(db, 'movieRatings', String(movieId), 'ratings'));
  return snap.docs.map(d => d.data().value);
}

// ── Reviews ──

export async function setReview(movieId, uid, text, displayName) {
  await setDoc(doc(db, 'movieReviews', String(movieId), 'reviews', uid), {
    text,
    displayName: displayName || 'Anonymous',
    createdAt: new Date().toISOString()
  });
}

export async function deleteReview(movieId, uid) {
  await deleteDoc(doc(db, 'movieReviews', String(movieId), 'reviews', uid));
}

// ── Review votes ──

export async function voteReview(movieId, reviewUid, voterUid, voteType) {
  const ref = doc(db, 'movieReviews', String(movieId), 'reviews', reviewUid);
  if (voteType === 'up') {
    await updateDoc(ref, {
      likes: arrayUnion(voterUid),
      dislikes: arrayRemove(voterUid),
    });
  } else if (voteType === 'down') {
    await updateDoc(ref, {
      dislikes: arrayUnion(voterUid),
      likes: arrayRemove(voterUid),
    });
  } else {
    await updateDoc(ref, {
      likes: arrayRemove(voterUid),
      dislikes: arrayRemove(voterUid),
    });
  }
}
