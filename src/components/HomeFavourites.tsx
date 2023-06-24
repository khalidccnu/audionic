import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import { Navigation, Autoplay } from "swiper";
import axios from "axios";
import { getFavourite } from "../utils";
import HomeFavouritesSongCard from "./HomeFavouritesSongCard.tsx";

type Song = {}[];

const HomeFavourites = () => {
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState<null | Song>(null);

  useEffect(() => {
    (async () => {
      const favourite: string[] = getFavourite();

      if (favourite.length) {
        await axios
          .get(`https://spotify23.p.rapidapi.com/tracks/`, {
            params: {
              ids: favourite.join(","),
            },
            headers: {
              "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
              "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
            },
          })
          .then((response) => setSongs(response.data.tracks));
      } else {
        setSongs(null);
      }

      setLoading(false);
    })();
  }, []);

  return (
    <section className="py-3">
      <div
        className="container position-relative"
        style={{ transform: "rotate(0deg)" }}
      >
        <h3 className="mb-3">Favourites</h3>
        {!loading ? (
          songs?.length ? (
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={true}
              autoplay={{
                delay: 5000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
              }}
              slidesPerView={1}
              spaceBetween={16}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 1,
                },
                924: {
                  slidesPerView: 2,
                },
                1280: {
                  slidesPerView: 3,
                },
              }}
            >
              {songs?.map((song) => (
                <SwiperSlide className="card d-flex h-auto">
                  <HomeFavouritesSongCard song={song} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="favourites-alert alert alert-info" role="alert">
              You have not added any song yet!
            </div>
          )
        ) : (
          <div className="text-center">
            <div className="spinner-border" role="status"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeFavourites;
