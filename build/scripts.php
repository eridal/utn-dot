<?php

require __DIR__ . '/../vendor/autoload.php';

use Assetic\Asset\AssetCollection;
use Assetic\Asset\FileAsset;
use Assetic\Asset\GlobAsset;

$css = new AssetCollection(array(

    new FileAsset(__DIR__ . '/../assets/jquery.js'),
    new FileAsset(__DIR__ . '/../assets/underscore.js'),
    new FileAsset(__DIR__ . '/../assets/almond.js'),
    new FileAsset(__DIR__ . '/../assets/backbone.js'),
    new FileAsset(__DIR__ . '/../assets/bootstrap.js'),
    new FileAsset(__DIR__ . '/../assets/viz.js'),

    new GlobAsset(__DIR__ . '/../js/coll/*.js'),
    new GlobAsset(__DIR__ . '/../js/model/*.js'),
    new GlobAsset(__DIR__ . '/../js/util/*.js'),
    new GlobAsset(__DIR__ . '/../js/view/*.js'),
));

file_put_contents(__DIR__ . '/scripts.js', $css->dump());
