import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Card from '../../components/Card'
import GridView from '../../components/GridView'
import ListView, { ListItem } from '../../components/ListView'
import './index.css'

export default class ShowCardView extends Component {
  infos = [
    {
      title: 'Algorithm Final Exam Review',
      links: [
        {
          linkName: 'Dropbox Directory',
          link:
            'https://www.dropbox.com/sh/7wua7gcvj329177/AADmmw1sKNIb352TiaMeVJuCa?dl=0'
        }
      ]
    },
    {
      title: 'Python Final Exam Review',
      links: [
        {
          linkName: 'Dropbox Directory',
          link:
            'https://www.dropbox.com/sh/9f0q2hsgvlyj3be/AAA5_CuGQzDAgPTnvL5dbJqLa?dl=0'
        },
        {
          linkName: 'Dropbox Paper Directory',
          link:
            'https://paper.dropbox.com/folder/show/python_collection-e.iX7ZavGxujPFwhjOZcQrkgApZxhKWzGWrMcoloGjRTUQgSc8Ka'
        }
      ]
    },
    {
      title: 'OP Final Report and Drafts',
      links: [
        {
          linkName: 'Dropbox Paper',
          link:
            'https://paper.dropbox.com/folder/show/assignment2-e.iX7ZavGxujPFwhjOZcQrbq37zHgsoMZnOemLz42QxMrSmAEz1T'
        }
      ]
    },
    {
      title: 'OP Diagram',
      links: [
        {
          linkName: 'Dropbox',
          link:
            'https://www.dropbox.com/sh/ysvpb87gbn0aprl/AAA5L6KRlik9mbTJO6Js19zSa?dl=0'
        }
      ]
    },
    {
      title: 'Leetcode Collection',
      links: [
        {
          linkName: 'Dropbox Paper',
          link:
            'https://paper.dropbox.com/folder/show/leetcode_collection-e.iX7ZavGxujPFwhjOZcQrkj5WRWLAaV0f6IWxGRLCCgEZKY4NnC'
        }
      ]
    }
  ]

  render() {
    const {
      type,
      children,
      className,
      prefixCls,
      showCardCls,
      prefixShowCardCls,
      ...rest
    } = this.props

    const cardList = this.infos.map(info => {
      const { title, links } = info
      const attr = {
        className: cx(prefixShowCardCls, showCardCls),
        title
      }
      if (type === 'grid') {
        attr.key = title
        return (
          <Card {...attr}>
            {links.map((link, i) => {
              return (
                <div
                  className={`${prefixShowCardCls}-innerItem`}
                  key={link.link}
                >
                  <a href={link.link} target="_blank">
                    {link.linkName}
                  </a>
                </div>
              )
            })}
          </Card>
        )
      }
      return (
        <ListItem key={title}>
          <Card {...attr}>
            <a href={link} target="_blank">
              {linkName}
            </a>
          </Card>
        </ListItem>
      )
    })

    const classString = cx(prefixCls, className)

    return type === 'grid' ? (
      <GridView className={classString} {...rest}>
        {cardList}
      </GridView>
    ) : (
      <ListView className={classString}>{cardList}</ListView>
    )
  }
}

ShowCardView.propTypes = {
  prefixCls: PropTypes.string,
  showCardCls: PropTypes.string,
  prefixShowCardCls: PropTypes.string,
  type: PropTypes.oneOf(['grid', 'list'])
}

ShowCardView.defaultProps = {
  prefixCls: 'pg-showcardview',
  prefixShowCardCls: 'pg-showcard',
  type: 'grid'
}
