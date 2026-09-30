import { Card, CardContent, Skeleton, Stack } from "@mui/material";

export default function PostSkeleton() {
  return (
    <Card sx={{ overflow: "hidden" }}>
      <Skeleton variant="rectangular" height={210} />
      <CardContent>
        <Skeleton width="72%" height={28} />
        <Skeleton width="100%" />
        <Skeleton width="92%" />
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
          <Skeleton width={80} />
          <Skeleton width={70} />
        </Stack>
      </CardContent>
    </Card>
  );
}
