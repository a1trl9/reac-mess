import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Card from '../../components/Card'
import GridView from '../../components/GridView'

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
    }
  ]

  render() {
    const {
      children,
      className,
      prefixCls,
      showCardCls,
      prefixShowCardCls,
      ...rest
    } = this.props

    const cardList = this.infos.map(info => {
      const { title, linkName, link } = info
      return (
        <Card
          key={title}
          className={cx(prefixShowCardCls, showCardCls)}
          title={title}
        >
          <a href={link} target="_blank">
            {linkName}
          </a>
        </Card>
      )
    })

    return (
      <GridView className={cx(prefixCls, className)} {...rest}>
        {cardList}
      </GridView>
    )
  }
}

ShowCardView.propTypes = {
  prefixCls: PropTypes.string,
  showCardCls: PropTypes.string,
  prefixShowCardCls: PropTypes.string
}

ShowCardView.defaultProps = {
  prefixCls: 'pg-showcardview',
  prefixShowCardCls: 'pg-showcard'
}
