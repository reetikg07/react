import { CDN_URL } from "../utils/constant"

const RestaurentCard = (props) => {
  const { resData } = props

  const {
    cloudinaryImageId,
    name,
    avgRating,
    deliveryTime,
    cuisines,
    costForTwo,
    id,
  } = resData?.info
  return (
    <div className="res-card">
      <img
        alt="res-logo"
        className="res-card-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(",")}</h4>
      <h4>{avgRating}</h4>
      <h4>{deliveryTime}</h4>
    </div>
  )
}

export default RestaurentCard
