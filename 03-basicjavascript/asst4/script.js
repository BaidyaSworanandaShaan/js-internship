function loopy() {
  var movieLists = [
    {
      name: "Instant Queue",
      videos: [
        {
          id: 70111470,
          title: "Die Hard",
          boxarts: [
            {
              width: 150,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg",
            },
            {
              width: 200,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg",
            },
          ],
          url: "http://api.netflix.com/catalog/titles/movies/70111470",
          rating: 4.0,
          bookmark: [],
        },
        {
          id: 654356453,
          title: "Bad Boys",
          boxarts: [
            {
              width: 200,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg",
            },
            {
              width: 150,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg",
            },
          ],
          url: "http://api.netflix.com/catalog/titles/movies/70111470",
          rating: 5.0,
          bookmark: [
            {
              id: 432534,
              time: 65876586,
            },
          ],
        },
      ],
    },
    {
      name: "New Releases",
      videos: [
        {
          id: 65432445,
          title: "The Chamber",
          boxarts: [
            {
              width: 150,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg",
            },
            {
              width: 200,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg",
            },
          ],
          url: "http://api.netflix.com/catalog/titles/movies/70111470",
          rating: 4.0,
          bookmark: [],
        },
        {
          id: 675465,
          title: "Fracture",
          boxarts: [
            {
              width: 200,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg",
            },
            {
              width: 150,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg",
            },
            {
              width: 300,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg",
            },
          ],
          url: "http://api.netflix.com/catalog/titles/movies/70111470",
          rating: 5.0,
          bookmark: [
            {
              id: 432534,
              time: 65876586,
            },
          ],
        },
      ],
    },
  ];

  //   Using Map
  //   movieLists = movieLists.map((movieItem) => {
  //     return movieItem.videos.map((item) => {
  //       return [item.id, item.title, item.boxarts];
  //     });
  //   });

  //   Using Map and Filter

  // movieLists = movieLists.map((movieItem) => {
  //   return movieItem.videos.map((videoItem) => {
  //     return videoItem.boxarts
  //       .filter((item) => item.width === 150)
  //       .map((item) => ({
  //         id: videoItem.id,
  //         title: videoItem.title,
  //         boxartUrl: videoItem.url,
  //       }));
  //   });
  // });

  // Using Map and Filter and Reduce
  movieLists = movieLists.reduce((acc, movieItem) => {
    return acc.concat(
      movieItem.videos.reduce((innerAcc, videoItem) => {
        return innerAcc.concat(
          videoItem.boxarts
            .filter((item) => item.width === 150)
            .map((item) => ({
              id: videoItem.id,
              title: videoItem.title,
              boxartUrl: videoItem.url,
            }))
        );
      }, [])
    );
  }, []);

  console.log(JSON.stringify(movieLists, null, " "));
  return movieLists;
}

console.log(loopy());
