import { Card as CardItem, Image, Text, Button } from "@mantine/core";
import styles from "./Card.module.css";
import { type CardProps } from "../../types/types";

export const Card = ({ src, title, text, alt, moreInfo }: CardProps) => {
  return (
    <CardItem
      className={styles.card}
      shadow="sm"
      padding="md"
      radius="md"
      withBorder
    >
      <CardItem.Section w={100} className={styles["card-image"]}>
        <Image src={src} alt={alt} />
      </CardItem.Section>

      <Text fw={500}>{title}</Text>

      <Text size="sm" c="dimmed">
        {text}
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md" onClick={moreInfo}>
        See more
      </Button>
    </CardItem>
  );
};
