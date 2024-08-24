import React, { useEffect, useState } from "react";
import { MenuProps, Item } from "@/types";
import { handbuck } from "@/utils/font";
import Image from "next/image";
import itemImage from "@/assets/images/item.png";

const menu = [
  {
    image: itemImage,
    title: "Fried Rice",
    description:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur.",
    amout: "200",
  },
  {
    image: itemImage,
    title: "Fried Rice",
    description:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur.",
    amout: "200",
  },
  {
    image: itemImage,
    title: "Fried Rice",
    description:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur.",
    amout: "200",
  },
  {
    image: itemImage,
    title: "Fried Mango",
    description:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur.",
    amout: "200",
  },
  {
    image: itemImage,
    title: "Fried Onions",
    description:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur.",
    amout: "200",
  },
  {
    image: itemImage,
    title: "Fried",
    description:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur.",
    amout: "200",
  },
  {
    image: itemImage,
    title: "Fried Tomato",
    description:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur.",
    amout: "500",
  },
];

const Menu: React.FC<MenuProps> = ({ onSetPositions }) => {
  const [pageSize, setPageSize] = useState(0);

  useEffect(() => {
    const pageSize = window.innerWidth;
    setPageSize(pageSize);
  }, []);

  useEffect(() => {
    const menuPosition = window.document.getElementById("menu");
    if (menuPosition && onSetPositions)
      onSetPositions((prevState) => ({
        ...prevState,
        menu: menuPosition?.offsetTop,
      }));
  }, []);
  return (
    <section className="mx-auto max-w-6xl w-5/6 mb-2 lg:mb-8" id="menu">
      <h2
        className={`${handbuck.className} pt-12 lg:pt-28 text-center text-3xl lg:text-6xl`}
      >
        Menu
      </h2>
      <div>
        {pageSize <= 800 ? (
          <MenuSmallScreen />
        ) : (
          <MenuLargeScreen menu={menu} />
        )}
      </div>
    </section>
  );
};

const MenuSmallScreen = () => {
  return (
    <div className="flex overflow-x-scroll gap-8 menu-small_screen">
      {menu.map((menuItem, index) => (
        <div className="shrink-0 basis-64">
          <MenuItem menuItem={menuItem} index={index} />
        </div>
      ))}
    </div>
  );
};

const MenuLargeScreen: React.FC<MenuProps> = ({ menu }) => {
  const [renderedMenu, setRenderedMenu] = useState<Item[]>([]);
  const [menuCursor, setMenuCursor] = useState(0);

  useEffect(() => {
    addItemToScreen(
      renderedMenu,
      menuCursor,
      menu,
      setRenderedMenu,
      setMenuCursor
    );
  }, []);
  return (
    <>
      <div className="grid grid-cols-3 gap-7">
        {renderedMenu.map((menuItem, index) => (
          <MenuItem menuItem={menuItem} index={index} />
        ))}
      </div>
      {menuCursor < menu.length && (
        <button
          className={`${handbuck.className} mt-14 text-center w-full lg:text-2xl text-[#ee7834]`}
          onClick={() =>
            addItemToScreen(
              renderedMenu,
              menuCursor,
              menu,
              setRenderedMenu,
              setMenuCursor
            )
          }
        >
          ReadMore
        </button>
      )}
    </>
  );
};

function MenuItem({
  index,
  menuItem,
}: {
  menuItem: Item;
  index: number;
}): React.JSX.Element {
  return (
    <div key={index} className="mt-10">
      <div className="relative h-36 lg:h-40 w-full">
        <Image
          src={menuItem.image}
          alt=""
          fill
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <h2 className={`${handbuck.className} lg:text-3xl mt-6`}>
        {menuItem.title}
      </h2>
      <p className="text-xs lg:text-sm">{menuItem.description}</p>
      <p className="mt-3 lg:mt-5 font-semibold text-sm lg:text-base">
        N{menuItem.amout}
      </p>
    </div>
  );
}

const CURSOR_VALUE = 3;
function addItemToScreen(
  renderedMenu: Item[],
  menuCursor: number,
  menu: Item[],
  setRenderedMenu: React.Dispatch<React.SetStateAction<Item[]>>,
  setMenuCursor: React.Dispatch<React.SetStateAction<number>>
) {
  const itemsForRenderedMenu: Item[] = [...renderedMenu];

  // Increase the cursor value by if it hasn't exceed the menu length
  // otherwise the newMenuCursorPosition will be set to the menu length
  // value
  const newMenuCursorPosition =
    menuCursor + CURSOR_VALUE < menu.length
      ? menuCursor + CURSOR_VALUE
      : menu.length;

  // Adds more item to renderedMenu
  for (let i = menuCursor; i < newMenuCursorPosition; i++) {
    itemsForRenderedMenu.push(menu[i]);
  }
  setRenderedMenu([...itemsForRenderedMenu]);
  setMenuCursor(newMenuCursorPosition);
}

export default Menu;
