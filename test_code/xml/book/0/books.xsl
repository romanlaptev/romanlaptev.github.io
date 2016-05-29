<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
<meta charset="utf-8"/>
<body>

<xsl:for-each select="books/book">
<b>[<xsl:value-of select="name(.)"/>_<xsl:number/>]</b><br/>
<xsl:value-of select="." /><br/>
</xsl:for-each>

</body>
</html>

</xsl:template>
</xsl:stylesheet>