import { useEffect, useState } from "react"
import Shimmer from "./Shimmer"
import { useParams } from "react-router-dom"

const RestaurantMenu = () => {
  const [resMenu, setResMenu] = useState(null)
  const { resId } = useParams()

  useEffect(() => {
    fetchMenu()
  }, [resId]) // ✅ now it fetches new data whenever resId changes

  const fetchMenu = async () => {
    try {
      const data = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.5073514&lng=73.8076543&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`
      )
      const json = await data.json()
      setResMenu(json.data)
    } catch (error) {
      console.error("Failed to fetch menu:", error)
    }
  }

  if (!resMenu) return <Shimmer />

  // Try to find the card with restaurant info
  const infoCard = resMenu?.cards?.find((card) => card?.card?.card?.info)
  const {
    name = "N/A",
    cuisines = [],
    cloudinaryImageId = "",
    costForTwoMessage = "",
    avgRating = "N/A",
  } = infoCard?.card?.card?.info || {}

  // Try to find the card with itemCards
  const menuCard = resMenu?.cards?.find((card) =>
    card?.groupedCard?.cardGroupMap?.REGULAR?.cards?.some(
      (c) => c?.card?.card?.itemCards
    )
  )

  const itemCards =
    menuCard?.groupedCard?.cardGroupMap?.REGULAR?.cards?.find(
      (c) => c?.card?.card?.itemCards
    )?.card?.card?.itemCards || []

  return (
    <div className="menu">
      <h1>{name}</h1>
      <h2>{cuisines.join(", ")}</h2>
      <h2>{costForTwoMessage}</h2>
      <h2>{avgRating} stars</h2>
      <ul>
        {itemCards.map((item) => (
          <li key={item.card.info.id}>
            {item.card.info.name} - ₹
            {(item.card.info.price ?? item.card.info.defaultPrice) / 100}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RestaurantMenu
