

export default async function () {
//   const targetColRef = returnTargetColRef(data.category)
//   const docRef = doc(targetColRef, data.id);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//     editedRefData.value = docSnap.data();
//   } else {
//     // docSnap.data() will be undefined in this case
//     console.log("No such document!");
//   }
  ////bind each ref attr to input
  ////when user presses save:

  ////is it a category change?


//   const categoryChanged = determineCategoryChange(
//     docSnap.data(),
//     editedRefData.value
//   );
//   const priorityChanged = determinePriorityChange(
//     docSnap.data(),
//     editedRefData.value
//   );
  if (priorityChanged) {
    //handle priority change
    if (priorityChanged == "down") {
      //handle dwn
      const nextDocRef = doc(targetColRef, data.id + 1);
      await updateDoc(docRef, {
        priority: increment(1),
      });
      await updateDoc(nextDocRef, {
        priority: increment(-1),
      });
    } else {
      const prevDocRef = doc(targetColRef, data.id - 1);
      await updateDoc(docRef, {
        priority: increment(-1),
      });
      await updateDoc(prevDocRef, {
        priority: increment(1),
      });
    }
  } else if (categoryChanged) {
    //handle category change
    await deleteDoc(docRef);
    await addData(editedRefData.value);
  } else {
    //normal updated
    await updateDoc(docRef, editedRefData.value);
  }
}
