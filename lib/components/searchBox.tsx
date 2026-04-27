import React from 'react';
import {SearchBoxProps} from '../hyper';

const searchBoxStyling: React.CSSProperties = {
  float: 'right',
  height: '28px',
  backgroundColor: 'white',
  position: 'absolute',
  right: '10px',
  top: '0px',
  width: '280px',
  zIndex: 9999
};

const enterKey = 13;
const escapeKey = 27;

export default class SearchBox extends React.PureComponent<SearchBoxProps> {
  searchTerm: string;
  constructor(props: SearchBoxProps) {
    super(props);
    this.searchTerm = '';
  }

  handleChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    this.searchTerm = event.currentTarget.value;
    if (event.keyCode === enterKey) {
      this.props.search(event.currentTarget.value);
    } else if (event.keyCode === escapeKey) {
      this.props.close();
    }
  };

  render() {
    const resultCount = this.props.resultCount ?? 0;
    const resultIndex = this.props.resultIndex ?? -1;
    const displaySearchIndicator = resultCount > 0 ? `${resultIndex + 1}/${resultCount}` : 'no matches';

    return (
      <div style={searchBoxStyling}>
        <input type="text" className="search-box" onKeyUp={this.handleChange} ref={(input) => input?.focus()} />
        <span className="search-indicator">{displaySearchIndicator}</span>
        <svg className="search-button" onClick={() => this.props.prev(this.searchTerm)}>
          <use xlinkHref="./renderer/assets/search-icons.svg#left-arrow" />
        </svg>
        <svg className="search-button" onClick={() => this.props.next(this.searchTerm)}>
          <use xlinkHref="./renderer/assets/search-icons.svg#right-arrow" />
        </svg>
        <svg className="search-button" onClick={() => this.props.close()}>
          <use xlinkHref="./renderer/assets/search-icons.svg#cancel" />
        </svg>
        <style jsx>
          {`
            .search-box {
              font-size: 18px;
              padding: 3px 6px;
              width: 120px;
              border: none;
              float: left;
            }

            .search-box:focus {
              outline: none;
            }

            .search-indicator {
              font-size: 12px;
              padding: 5px 4px;
              text-align: center;
              display: inline-block;
              float: left;
              color: #666;
              min-width: 24px;
            }

            .search-button {
              background-color: #ffffff;
              color: black;
              padding: 7px 5.5px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              transition-duration: 0.4s;
              cursor: pointer;
              height: 27px;
              width: 24px;
              float: left;
            }
            .search-button:hover {
              background-color: #e7e7e7;
            }
          `}
        </style>
      </div>
    );
  }
}
