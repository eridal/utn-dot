<?php

require __DIR__ . '/../vendor/autoload.php';

use Assetic\Asset\AssetCollection;
use Assetic\Asset\FileAsset;
use Assetic\Asset\GlobAsset;
use Assetic\Filter\CssMinFilter;

$css = new AssetCollection(array(
    new GlobAsset(__DIR__ . '/../assets/*.css'),
    new GlobAsset(__DIR__ . '/../css/*.css'),
), array(
    new CssMinFilter()
));

file_put_contents(__DIR__ . '/styles.css', $css->dump());
