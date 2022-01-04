import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: PropTypes.string,
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
    }

    articles = [
        {
            "source": {
                "id": null,
                "name": "New York Times"
            },
            "author": "Derrick Bryson Taylor",
            "title": "Winter Storm Hits the D.C. Area and Knocks Out Power Across Southeast - The New York Times",
            "description": "Hundreds of thousands were without electricity on Monday, and federal government offices in the Washington, D.C., area were closed because of the storm.",
            "url": "https://www.nytimes.com/2022/01/03/us/sleet-snow-forecast.html",
            "urlToImage": "https://static01.nyt.com/images/2022/01/03/multimedia/03xp-snow-1/03xp-snow-1-facebookJumbo.jpg",
            "publishedAt": "2022-01-03T14:01:43Z",
            "content": "Ahead of the storm, Mayor Muriel Bowser of Washington declared a snow emergency in the District of Columbia for much of Monday. Gov. Larry Hogan of Maryland mobilized state resources, and Gov. Philip… [+777 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "New York Times"
            },
            "author": "Sameer Yasir",
            "title": "Online ‘Auction’ Is Latest Attack on Muslim Women in India - The New York Times",
            "description": "The fake site, the second in months, is a sign of the organized nature of virtual bullying, with threats of sexualized violence aimed at silencing the outspoken.",
            "url": "https://www.nytimes.com/2022/01/03/world/asia/india-auction-muslim-women.html",
            "urlToImage": "https://static01.nyt.com/images/2022/01/03/world/03india-app-01/03india-app-01-facebookJumbo.jpg",
            "publishedAt": "2022-01-03T13:40:35Z",
            "content": "Karti Chidambaram, a member of Indias Parliament and a leader of the opposition Congress party, wrote on Twitter that he was appalled that those responsible apparently felt emboldened because of the … [+1335 chars]"
        },
        {
            "source": {
                "id": "cnn",
                "name": "CNN"
            },
            "author": "Chloe Melas, CNN",
            "title": "A reporter set out on a quest to solve her family's sleep crisis. Here's what she found - CNN",
            "description": "CNN's Chloe Melas is the mom of two young boys, ages 2 and 4. The kids haven't slept through the night except for a few months when they were infants, causing extreme sleep deprivation for her and her husband. Melas set out on a quest with a sleep guru to get…",
            "url": "https://www.cnn.com/2022/01/03/health/how-to-get-your-kids-to-sleep-wellness/index.html",
            "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/211231171817-better-sleep-chloe-melas-1-crib-super-tease.jpg",
            "publishedAt": "2022-01-03T13:19:00Z",
            "content": "Sign up for the Sleep, But Better newsletter series. Our seven-part guide has helpful hints to achieve better sleep.\r\n (CNN)I'm really tired.\r\nNo, seriously. I don't think I've slept through the nigh… [+6570 chars]"
        }
    ]
    constructor() {
        super();
        console.log("this is constructor in news component")
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1
        }
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.props.page}&pageSize=${this.props.pageSize}`;
        // const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=b8b86f4eb0234c9f8ac3ae9873001dd2&page=${this.props.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePreviousClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    render() {
        return (
            <div className="container text-center my-3">
                <h1>NewsMonkey - Top Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                                imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div>
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalPages / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default News
