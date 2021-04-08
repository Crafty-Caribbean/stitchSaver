import React from 'react';
import { Link } from 'react-router-dom';
import { IoPersonCircle } from 'react-icons/io5';
import styles from './PatternSummary.css';
import CommentsSection from './CommentsSection';
import Tag from './Tag';
import FavoritesButton from './FavoritesButton';
import ContentSelectorList from './ContentSelectorList';
import BuyButton from './BuyButton';

class PatternSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false,
      contentDisplay: 'comments', // 'description' or 'comments'
    };
    this.changeContentDisplay = this.changeContentDisplay.bind(this);
  }

  changeContentDisplay(newContent) {
    this.setState({ contentDisplay: newContent });
  }

  render() {
    const { isLiked, contentDisplay } = this.state;
    const { patterninfo } = this.props;

    return (
      <div className={styles.patternSummaryContainer}>

        <div className={styles.content}>

          <div className={styles.titleAndButton}>
            <div className={styles.favoriteButton}>
              <FavoritesButton
                size={30}
                isLiked={isLiked}
                handleClick={() => this.setState({ isLiked: !isLiked })}
              />
            </div>
            <div className={styles.patternName}>
              {patterninfo.name}
            </div>
            <BuyButton price={patterninfo.price} handleClick={console.log} />

          </div>

          <div className={styles.authorContainer}>
            <button className={styles.authorName} type="button">
              <Link to={`/user/${patterninfo.author.id}`}>
                <IoPersonCircle
                  color="#777777"
                  size="50"
                />
              </Link>
            </button>
            <p>
              <Link to={`/user/${patterninfo.author.id}`} className={styles.authorLink}>
                {patterninfo.author.username}
              </Link>
            </p>

          </div>
          <div className={styles.tagContainer}>
            <div className={styles.craftTypeTag}>
              <Tag type={patterninfo.craft_type} />
            </div>
            <div className={styles.skillLevelTag}>
              <Tag type={patterninfo.skill_level} />
            </div>
          </div>

          <ContentSelectorList
            selected={contentDisplay}
            changeContentDisplay={this.changeContentDisplay}
          />

          {contentDisplay === 'description'
            && (
              <div className={styles.descriptionInfo}>
                <p className={styles.descriptionParagraph}>
                  {patterninfo.description}
                </p>
              </div>
            )}
          {contentDisplay === 'comments'
          && (
            <CommentsSection />
          )}
        </div>


      </div>
    );
  }
}

export default PatternSummary;