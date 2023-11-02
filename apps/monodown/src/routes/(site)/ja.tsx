import { Outlet } from "solid-start";
import { List, ListItem, Link, Paragraph } from "~/components/mdx";

export default function JALayout() {
  return (
    <div class="flex overflow-hidden tocHack">
      <aside class="p-8 bg-accent">
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
    </div>
  );
}
