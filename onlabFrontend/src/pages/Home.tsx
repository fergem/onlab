import NavButton from "../components/NavButton";
import { css } from "@emotion/react";

export default function Home() {
  return (
    <div className="flex flex-col px-52">
      <div className="card shadow-2xl mb-10">
        <div className="card-body flex flex-1 flex-row px-20 py-10">
          <div className="flex-1 mr-16">
            <img
              src="https://www.petspyjamas.com/uploads/2020/04/shutterstock_189642425-690x460.jpg"
              alt=""
              className="object-contain rounded-lg"
            />
          </div>
          <article className="prose flex-1 flex-col">
            <header>
              Do you want your pet to have a nice vacation as you'll have?
            </header>
            <text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              dolorum ex ullam modi, tenetur animi, quidem numquam nihil vel
              illo possimus fuga quam eum ipsum expedita, sint distinctio
            </text>
            {/* <NavButton name="Be a pet owner!" route="/register" /> */}
          </article>
        </div>
      </div>
      <div className="card shadow-2xl">
        <div className="flex flex-1 flex-row px-20 py-10">
          <article className="flex-1 flex-col">
            <header>Do you want to be a petsitter?</header>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              dolorum ex ullam modi, tenetur animi, quidem numquam nihil vel
              illo possimus fuga quam eum ipsum expedita, sint distinctio
            </p>
            {/*    <NavButton name="Be a petsitter!" route="/register" /> */}
          </article>
          <div className="flex-1 ml-16">
            <img
              src="https://images.prismic.io/yoopies-cms/e461e7ee-3b54-46e4-aff2-5e29466e1495_matt-nelson-aI3EBLvcyu4-unsplash.jpg?auto=compress,format&rect=0,0,7952,5301&w=1200&h=800"
              alt=""
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
