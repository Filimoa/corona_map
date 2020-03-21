export default function getUserCords(width, scrollSize) {
  if (width > 600) {
    return width - 370 - scrollSize;
  } else {
    return width - scrollSize;
  }
}
