import React, { Fragment } from 'react';

export default () => {
  return (
    <Fragment>
      <div className="separator-breadcrumb border-top"></div>
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
            <div className="card-body text-center">
              <i className="i-Add-User"></i>
              <div className="content">
                <p className="text-muted text-16 mt-2 mb-0">Funcionários</p>
                <p className="text-primary text-24 line-height-1 mb-2">20</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
            <div className="card-body text-center">
              <i className="i-Add-User"></i>
              <div className="content">
                <p className="text-muted text-16 mt-2 mb-0">Categorias</p>
                <p className="text-primary text-24 line-height-1 mb-2">10</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
            <div className="card-body text-center">
              <i className="i-Money-2"></i>
              <div className="content">
                <p className="text-muted text-16 mt-2 mb-0">Produtos</p>
                <p className="text-primary text-24 line-height-1 mb-2">8</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
