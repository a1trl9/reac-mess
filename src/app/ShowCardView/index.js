import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Card from '../../components/Card'
import GridView from '../../components/GridView'
import ListView, { ListItem } from '../../components/ListView'

export default class ShowCardView extends Component {
  infos = [
    {
      title: 'Algorithm Final Exam Review',
      linkName: 'Dropbox Directory',
      link:
        'https://www.dropbox.com/sh/7wua7gcvj329177/AADmmw1sKNIb352TiaMeVJuCa?dl=0'
    },
    {
      title: 'Python Final Exam Review',
      linkName: 'Dropbox Directory',
      link:
        'https://www.dropbox.com/sh/9f0q2hsgvlyj3be/AAA5_CuGQzDAgPTnvL5dbJqLa?dl=0'
    },
    {
      title: 'OP Final Report and Drafts',
      linkName: 'Dropbox Paper',
      link:
        'https://paper.dropbox.com/folder/show/assignment2-e.iX7ZavGxujPFwhjOZcQrbq37zHgsoMZnOemLz42QxMrSmAEz1T'
    },
    {
      title: 'OP Diagram',
      linkName: 'Dropbox',
      link:
        'https://www.dropbox.com/sh/ysvpb87gbn0aprl/AAA5L6KRlik9mbTJO6Js19zSa?dl=0'
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
      const { title, linkName, link } = info
      const attr = {
        className: cx(prefixShowCardCls, showCardCls),
        title
      }
      if (type === 'grid') {
        attr.key = title
        return (
          <Card {...attr}>
            <a href={link} target="_blank">
              {linkName}
            </a>
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
