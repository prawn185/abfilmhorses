#!/bin/bash

composer self-update
composer update


bash scripts/migrate.sh
bash scripts/config_seed.sh
bash scripts/data_seed.sh

