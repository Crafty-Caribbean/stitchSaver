import React from 'react';
import PropTypes from 'prop-types';
import PatternCard from '../PatternCard';
import styles from './HomePage.css';
import axios from 'axios';

import UserContext from '../UserContext.js';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleToggledHeart = this.handleToggledHeart.bind(this)
  }

  handleToggledHeart (id) {
    const { token, currentUser } = this.context;

    if (token === '' || currentUser.userId === undefined) {
      console.log('cannot favorite, not logged in');
      return;
    }

    axios({
      method: 'post',
      url: `/api/users/${currentUser.userId}/favorite/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        pattern_id: id,
      },
    })
      .then((response) => {
        getUserData(user)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { list } = this.props;
    return (
      <div className={`homePage ${styles.homePage}`}>
        {list.length > 0
          ? list.map((pattern) => (
            <PatternCard
              key={pattern.id}
              cardWidth="210px"
              id={pattern.id}
              name={pattern.name || pattern.title}
              price={Number(pattern.price).toFixed(2)}
              imgSrc={pattern.images[0]}
              skillLevel={pattern.skill_level}
              craftType={pattern.craft_type}
              handleToggledHeart={(id) => this.handleToggledHeart(id)}
            />
          ))
          : <div className={`${styles.emptyList}`}>{'Couldn\'t find patterns :('}</div>}
        {/* <PatternCard
          cardWidth={210}
          imgSrc="https://static1.dmc.com/cache/p/a/pat0339_01_880x1322.jpg"
          skillLevel="Beginner"
          craftType="Crochet"
          name="Name"
        />
        <PatternCard
          cardWidth={210}
          imgSrc="https://static1.dmc.com/cache/p/a/pat14932_440x661.jpg"
          skillLevel="Novice"
          craftType="Knitting"
          name="Name"
        />
        <PatternCard
          cardWidth={210}
          imgSrc="https://i.pinimg.com/564x/51/c8/70/51c8705b6915d2560748f03939201d3b.jpg"
          skillLevel="Intermediate"
          craftType="Crochet"
          name="Name"
        />
        <PatternCard
          cardWidth={210}
          imgSrc="https://i.pinimg.com/236x/40/b9/98/40b99803dd12cab0484c1680e5d8de08.jpg"
          skillLevel="Advanced"
          craftType="Knitting"
          name="Name"
        />
        <PatternCard
          cardWidth={210}
          imgSrc="https://static.pxlecdn.com/photos/390837339/original/176e835ea490f1e7f0f6.jpg"
          skillLevel="Expert"
          craftType="Knitting"
          name="Name"
        /> */}
      </div>
    );
  }
}

HomePage.displayName = 'home-page';

HomePage.contextType = UserContext;

HomePage.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
};

HomePage.defaultProps = {
  list: PropTypes.arrayOf(PropTypes.object),
};

export default HomePage;
