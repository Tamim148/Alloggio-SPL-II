import "./featuredProperties.css";

const FeaturedProperties = () => {
  return (
    <div className="fp">
      <div className="fpItem">
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/b1/b1/39/long-beach-hotel.jpg?w=300&h=300&s=1"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Long beach Hotel</span>
        <span className="fpCity">Cox's Bazar</span>
        <span className="fpPrice">Starting from $120</span>
        <div className="fpRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/cc/ed/6e/royal-tulip-sea-pearl.jpg?w=300&h=300&s=1"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Sea peral</span>
        <span className="fpCity">ox's Bazar</span>
        <span className="fpPrice">Starting from $140</span>
        <div className="fpRating">
          <button>9.3</button>
          <span>Exceptional</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/be/3d/ac/sea-front-deluxe-supreme.jpg?w=300&h=300&s=1"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Four Seasons Hotel</span>
        <span className="fpCity">Cox's Bazar </span>
        <span className="fpPrice">Starting from $99</span>
        <div className="fpRating">
          <button>8.8</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/a6/a2/b6/best-western-heritage.jpg?w=300&h=300&s=1"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Best Western Hotel</span>
        <span className="fpCity">Cox's Bazar</span>
        <span className="fpPrice">Starting from $105</span>
        <div className="fpRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;
