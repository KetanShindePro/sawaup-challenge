import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CourseType } from "../../store/types";
import { CardActionArea, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useMemo, useState, useEffect } from "react";
import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../store/slices/user.slice";
import { addFavoriteCourse, removeFavoriteCourse } from "../../store/actions";
import { Favourites } from "@prisma/client";

type CourseCard = {
  course: CourseType;
};

const CourseCard = React.memo(function CardComponent(props: CourseCard) {
  const [isFavorite, setFavorite] = useState(false);
  const [favoriteEntry, setFavoriteEntry] = useState<Favourites>();

  const dispatch = useDispatch();

  const userData = useSelector(getUserData);
  const favourites = userData?.favourites;

  const { course } = props;
  const { id, videos } = course;
  const memoizedVideoId: string = useMemo(() => {
    const slicedUrl = videos?.[0].url.split("=");
    return slicedUrl[slicedUrl.length - 1];
  }, [videos?.[0].url]);

  useEffect(() => {
    if (favourites?.length) {
      const foundFavorite = favourites.find(
        (fav) => fav.courseId === course.id
      );
      if (foundFavorite) {
        setFavoriteEntry(foundFavorite);
        setFavorite(true);
      }
    }
  }, [favourites, course]);

  const toggleFavorites = async () => {
    if (!isFavorite) {
      const fetchResponse = await fetch("/api/set-favorite", {
        method: "POST",
        body: JSON.stringify({ userId: userData?.id, courseId: id }),
      });
      let setFavoriteResp = await fetchResponse.json();
      dispatch(addFavoriteCourse(setFavoriteResp?.favourite));
    } else {
      const fetchResponse = await fetch("/api/remove-favorite", {
        method: "POST",
        body: JSON.stringify({ favoriteId: favoriteEntry?.id }),
      });
      let removeFavoriteResp = await fetchResponse.json();
      dispatch(removeFavoriteCourse(removeFavoriteResp?.favourite));
    }
    setFavorite(!isFavorite);
  };

  return (
    <Card sx={{ width: "16rem", height: "100%", m: "1rem" }}>
      <Link href={"/course/" + id}>
        <CardActionArea>
          <CardMedia
            sx={{ height: "9rem" }}
            image={"https://img.youtube.com/vi/" + memoizedVideoId + "/0.jpg"}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {course.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <IconButton
          aria-label="Toggle favorites"
          onClick={() => toggleFavorites()}
        >
          {isFavorite ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteIcon color="action" />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
});

export default CourseCard;
