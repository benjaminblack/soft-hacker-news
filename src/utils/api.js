import allSettled from 'promise.allsettled';

allSettled.shim();

const BATCH_SIZE = 10;

export async function* getItemIterator({ itemIds, batchSize = BATCH_SIZE, endpoint }) {
  let position = 0;

  for (;;) {
    const batchIds = itemIds.slice(position, position + batchSize);
    position += batchSize;

    if (position < itemIds.length - 1) {
      yield getItems(batchIds, endpoint);
    } else {
      return getItems(batchIds, endpoint);
    }
  }
}

export async function getItems(ids, endpoint) {
  const requests = ids.map((id) => getItem(id, endpoint));
  const outcomes = await Promise.allSettled(requests);
  const items = outcomes.filter(({ status }) => status === 'fulfilled').map(({ value }) => value);
  return items;
}

export async function getItem(id, endpoint) {
  return (await fetch(`https://hacker-news.firebaseio.com/v0/${endpoint}/${id}.json`)).json();
}

export async function getStories(type) {
  return (await fetch(`https://hacker-news.firebaseio.com/v0/${type}stories.json`)).json();
}
