import NavButton from "../components/NavButton";
import { css } from "@emotion/react";

export default function Home() {
  return (
    <EuiPage paddingSize="s" direction="column">
      <EuiPageHeader></EuiPageHeader>
      <EuiPageBody>
        <EuiFlexGroup direction="column">
          <EuiPanel css={panelStyle}>
            <EuiImage
              src="https://www.petspyjamas.com/uploads/2020/04/shutterstock_189642425-690x460.jpg"
              alt=""
            />
            <EuiFlexItem>
              <EuiHeader>
                Do you want your pet to have a nice vacation as you'll have?
              </EuiHeader>
              <EuiText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                dolorum ex ullam modi, tenetur animi, quidem numquam nihil vel
                illo possimus fuga quam eum ipsum expedita, sint distinctio
              </EuiText>
              {/* <NavButton name="Be a pet owner!" route="/register" /> */}
            </EuiFlexItem>
          </EuiPanel>
          <EuiPanel className="panelStyle">
            <EuiImage
              src="https://images.prismic.io/yoopies-cms/e461e7ee-3b54-46e4-aff2-5e29466e1495_matt-nelson-aI3EBLvcyu4-unsplash.jpg?auto=compress,format&rect=0,0,7952,5301&w=1200&h=800"
              alt=""
            />
            <EuiFlexItem>
              <EuiHeader>Do you want to be a petsitter?</EuiHeader>
              <EuiText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                dolorum ex ullam modi, tenetur animi, quidem numquam nihil vel
                illo possimus fuga quam eum ipsum expedita, sint distinctio
              </EuiText>
              {/*    <NavButton name="Be a petsitter!" route="/register" /> */}
            </EuiFlexItem>
          </EuiPanel>
        </EuiFlexGroup>
      </EuiPageBody>
    </EuiPage>
  );
}
