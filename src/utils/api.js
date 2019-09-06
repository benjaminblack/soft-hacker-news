import allSettled from 'promise.allsettled';

allSettled.shim();

const BATCH_SIZE = 10;

export async function* getStoriesIterator(type) {
  const allStoryIds = await getAllStoryIds(type);

  for (let i = 0; i < allStoryIds.length; i += BATCH_SIZE) {
    const batchIds = allStoryIds.slice(i, i + BATCH_SIZE);

    // map id to a Promise returning the item JSON for that id
    const storyRequests = batchIds.map((id) => getItemById(id));

    // wait for all Promises to settle (resolve or reject)
    const storyRequestOutcomes = await Promise.allSettled(storyRequests);

    // filter out (ignore) failed requests and reduce successful outcomes to story objects
    const stories = storyRequestOutcomes.filter(({ status }) => status === 'fulfilled').map(({ value }) => value);

    yield stories;
  }
}

async function getItemById(id) {
  return (await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)).json();
}

async function getAllStoryIds(type) {
  return (await fetch(`https://hacker-news.firebaseio.com/v0/${type}stories.json`)).json();
}
