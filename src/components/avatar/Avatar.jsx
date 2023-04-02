const Avatar = ({ src }) => {
  return (
    <img
      className="w-10 aspect-square rounded-full self-center"
      src={src}
      alt="user avatar"
    />
  )
}

export default Avatar
