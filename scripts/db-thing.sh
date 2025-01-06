if [ -d "../storage/drizzle" ]; then
  rm -r server/db/drizzle
  echo "Deleted existing server/db/drizzle directory."
else
  echo "No drizzle directory found, skipping deletion."
fi

drizzle-kit generate