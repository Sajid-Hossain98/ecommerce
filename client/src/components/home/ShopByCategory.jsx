import { Link } from "react-router-dom";

const options = [
  {
    icon: " https://i.ibb.co/x8zppZz/mechanical-keyboard.png",
    label: "Mechanical Keyboard",
  },
  { icon: "https://i.ibb.co/16jHX7V/gaming-mouse.png", label: "Gaming Mouse" },
  {
    icon: "https://i.ibb.co/fHHX0dW/gaming-headset.png",
    label: "Gaming Headset",
  },
  { icon: "https://i.ibb.co/7XwhWmZ/mousepad.png", label: "Mousepad" },
  { icon: "https://i.ibb.co/K6BXz6f/sound-system.png", label: "Sound System" },
  { icon: "https://i.ibb.co/JHZZ2yB/gaming-chair.png", label: "Gaming Chair" },
];

const ShopByCategory = () => {
  return (
    <div className="shopByCategory">
      {options.map((option, index) => (
        <ul key={index}>
          <Link
            to={`products/${option.label.replace(/\s+/g, "-").toLowerCase()}`}
          >
            <div className="iconAndLink">
              <img src={option.icon} alt={option.label} />
              <li>{option.label}</li>
            </div>
          </Link>
        </ul>
      ))}
    </div>
  );
};

export default ShopByCategory;
