import { useState, useEffect } from "react"
import {
  projectAuth,
  projectStorage,
  projectFirestore,
} from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (displayName, email, password, thumbnail) => {
    setError(null)
    setIsPending(true)

    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      )

      if (!res) {
        throw new Error("Could not complete signup")
      }

      // create path for thumbnail photo and upload the photo there
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      const image = await projectStorage.ref(uploadPath).put(thumbnail)
      const imageURL = await image.ref.getDownloadURL()

      // add display name to user
      // add photoURL property to the user
      await res.user.updateProfile({ displayName, photoURL: imageURL })

      // create firestore document for each user
      await projectFirestore.collection("users").doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: imageURL,
      })

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}
