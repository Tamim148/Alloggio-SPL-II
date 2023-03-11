import useFetch from "../../hooks/useFetch";
import "./fetured.css";

const Featured = () => {
  const { data, loading } = useFetch(
    "http://localhost:8800/api/hotels/countByCity?cities=coxsbazar,rangamati,bandarban"
  );
  console.log(data);
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://q-xx.bstatic.com/xdata/images/city/300x240/666853.jpg?k=b2212159e829c00b8b19af72b6211b25325d70811829e2eb4ef1045f8a568be5&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Coxs Bazar</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/16/5e/59/rangamati-hanging-bridge.jpg?w=700&h=500&s=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Rangamati</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/77/22/14/amiakhum.jpg?w=700&h=500&s=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Bandarban</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
