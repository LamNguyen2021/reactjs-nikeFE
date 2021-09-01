// import React from 'react';
// // import { Route, RouteProps } from 'react-router-dom';
import { Props } from '../Model/IPage';
import * as React from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router';
import NavBar from '../Layout/Navbar/Navbar';
import Footer from '../Layout/Footer/Footer';

const HomeLayout = (props: Props) => {
  return (
    <React.Fragment>
      <NavBar />
      {props.children}
      <Footer />
    </React.Fragment>
  );
};

const HomeTemplate: React.SFC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  if (!Component) {
    return null;
  }
  return (
    <Route
      {...rest}
      render={(propsComponent: RouteComponentProps<{}>) => {
        return (
          <HomeLayout>
            <Component {...propsComponent} />
          </HomeLayout>
        );
      }}
    />
  );
};

export default HomeTemplate;
