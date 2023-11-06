import { Outlet } from "solid-start";
import { List, ListItem, Link, Paragraph } from "~/components/mdx";

export default function JALayout() {
  return (
    <>
      <aside class="bg-accent">
        <List ordered={false}>
          <ListItem>
            <Paragraph>
              <Link>Writing System</Link>
            </Paragraph>
            <List ordered={false}>
              <ListItem>
                <Paragraph>
                  <Link>Hiragana</Link>
                </Paragraph>
              </ListItem>
              <ListItem>
                <Paragraph>
                  <Link>Katakana</Link>
                </Paragraph>
              </ListItem>
            </List>
          </ListItem>
        </List>
      </aside>
      <Outlet />
    </>
  );
}
