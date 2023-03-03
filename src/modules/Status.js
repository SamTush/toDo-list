export default function Status($items, $id, $status) {
  $items.find((item) => item.index === $id).completed = $status;
  localStorage.setItem('items', JSON.stringify($items));
}