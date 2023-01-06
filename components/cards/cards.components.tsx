import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CourseType } from "../../store/types";
import { CardActionArea, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useMemo } from "react";
import React from "react";
import Link from "next/link";

type CourseCard = {
  course: CourseType;
};

const CourseCard = React.memo(function CardComponent(props: CourseCard) {
  const { course } = props;
  const { id, videos } = course;
  const memoizedVideoId: string = useMemo(() => {
    const slicedUrl = videos?.[0].url.split("=");
    return slicedUrl[slicedUrl.length - 1];
  }, [videos?.[0].url]);

  return (
    <Card sx={{ width: "16rem", height: "100%", m: "1rem" }}>
      <Link href={'/course/' + id}>
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon color="error" />
        </IconButton>
      </CardActions>
    </Card>
  );
});

export default CourseCard;
